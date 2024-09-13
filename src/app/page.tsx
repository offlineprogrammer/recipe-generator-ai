"use client";
import { createAIHooks } from "@aws-amplify/ui-react-ai";
import { amplifyClient } from "@/app/amplify-utils";

import {
  Heading,
  Loader,
  Placeholder,
  Text,
  View,
} from "@aws-amplify/ui-react";

import React, { FormEvent } from "react";

const { useAIGeneration } = createAIHooks(amplifyClient);

export default function Page() {
  const [{ data, isLoading}, generateRecipe] =
    useAIGeneration("generateRecipe");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      generateRecipe({
        description: formData.get("description")?.toString() || "",
      });
    } catch (e) {
      alert(`An error occurred: ${e}`);
    } finally {
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Meet Your Personal
          <br />
          <span className="highlight">Recipe AI</span>
        </h1>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
          <input
            type="text"
            className="wide-input"
            id="description"
            name="description"
          />
          <button type="submit" className="search-button">
            Generate
          </button>
        </div>
      </form>
      <div className="result-container">
        {isLoading ? (
          <div className="loader-container">
            <p>Loading...</p>
            <Loader size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
            <Placeholder size="large" />
          </div>
        ) : (
          data?.name && (
            <p className="result">
              <Heading level={3}>{data?.name}</Heading>
              <br />
              <Heading level={4}>Ingredients:</Heading>
              <br />
              <View as="ul">
                {data?.ingredients?.map((ingredient: unknown) => (
                  <Text as="li" key={ingredient}>
                    {ingredient}
                  </Text>
                ))}
              </View>
              <br />
              <Heading level={4}>Instructions:</Heading>
              <br />
              <Text>{data?.instructions}</Text>
            </p>
          )
        )}
      </div>
    </div>
  );
}
