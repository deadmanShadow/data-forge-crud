const translationCache: Record<string, string> = {};

export async function translateText(text: string, from: string, to: string) {
  if (from === to || !text || text.trim() === "") {
    return text;
  }
  const cacheKey = `${text}_${from}_${to}`;
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }
  try {
    const apiEndpoint = "https://api.mymemory.translated.net/get";

    const response = await fetch(
      `${apiEndpoint}?q=${encodeURIComponent(text)}&langpair=${from}|${to}`,
      { cache: "force-cache" }
    );

    const data = await response.json();

    if (data.responseStatus && data.responseStatus !== 200) {
      console.warn(
        `Translation warning: ${data.responseStatus} - ${data.responseDetails}`
      );
      return text;
    }

    const translatedText = data.responseData?.translatedText || text;
    translationCache[cacheKey] = translatedText;
    return translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
}

export async function preloadTranslations(
  terms: string[],
  from: string,
  to: string
) {
  if (from === to) return;

  try {
    const batchSize = 5;
    for (let i = 0; i < terms.length; i += batchSize) {
      const batch = terms.slice(i, i + batchSize);

      await Promise.all(batch.map((term) => translateText(term, from, to)));

      if (i + batchSize < terms.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  } catch (error) {
    console.error("Failed to preload translations:", error);
  }
}
