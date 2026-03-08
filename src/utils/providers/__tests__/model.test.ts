import { describe, expect, it } from "vitest"
import { resolveModelId } from "../model"

describe("resolveModelId", () => {
  it("uses the selected model when custom mode is off", () => {
    expect(resolveModelId({
      model: "claude-3-7-sonnet-latest",
      isCustomModel: false,
      customModel: " us.anthropic.claude-3-7-sonnet-20250219-v1:0 ",
    })).toBe("claude-3-7-sonnet-latest")
  })

  it("uses the custom model when custom mode is on", () => {
    expect(resolveModelId({
      model: "claude-3-7-sonnet-latest",
      isCustomModel: true,
      customModel: " us.anthropic.claude-3-7-sonnet-20250219-v1:0 ",
    })).toBe("us.anthropic.claude-3-7-sonnet-20250219-v1:0")
  })

  it("falls back to the configured model when the custom model is empty", () => {
    expect(resolveModelId({
      model: "claude-3-7-sonnet-latest",
      isCustomModel: true,
      customModel: "   ",
    })).toBe("claude-3-7-sonnet-latest")
  })

  it("falls back to the custom model when the primary resolved model is missing", () => {
    expect(resolveModelId({
      model: "   " as never,
      isCustomModel: false,
      customModel: " us.anthropic.claude-3-7-sonnet-20250219-v1:0 ",
    })).toBe("us.anthropic.claude-3-7-sonnet-20250219-v1:0")
  })
})
