const url = 'https://www.deepl.com/jsonrpc'
const body = (textToTranslate) => `{
	"jsonrpc": "2.0",
	"method": "LMT_handle_jobs",
	"params": {
		"jobs": [
			{
				"kind": "default",
				"raw_en_sentence": "${textToTranslate}"
			}
		],
		"lang": {
			"user_preferred_langs": [
				"DE"
			],
			"source_lang_user_selected": "auto",
			"target_lang": "EN"
		},
		"priority": -1
	},
	"id": 2
}`

const parseTranslationsFromAPIAnswer = (res) => {
  let translations = []
  if (res.result && res.result.translations && res.result.translations[0]) {
    const beams = res.result.translations[0].beams
    if (beams.length) {
      translations = [...beams].map(({postprocessed_sentence}) => postprocessed_sentence)
    }
  }
  console.log(translations)
  return translations
}

const translate = async (text) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: body(text),
      mode: 'cors'
    })
    console.debug(res.statusText, 'Ok: ', res.ok)
    const json = await res.json()
    const translations = parseTranslationsFromAPIAnswer(json)
    console.log(translations)
    return translations
  } catch (e) {
    console.warn('error', e)
  }
}

export default translate

// inspire from this link for error codes and so on
// https://github.com/chriskonnertz/DeepLy/blob/master/src/ChrisKonnertz/DeepLy/ResponseBag/TranslationBag.php
