import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const SYSTEM_PROMPT =
  "You are a helpful assistant that generates recipes." +
  " Please generate a recipe based on the following description:";
const schema = a.schema({
  generateRecipe: a
    .generation({
      aiModel: a.ai.model("Claude 3 Sonnet"),
      systemPrompt: SYSTEM_PROMPT,
    })
    .arguments({
      description: a.string(),
    })
    .returns(
      a.customType({
        name: a.string(),
        ingredients: a.string().array(),
        instructions: a.string(),
      })
    )
    .authorization((allow) => allow.authenticated()),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
