import nltk
from nltk import word_tokenize
from nltk.probability import FreqDist
from nltk.corpus import stopwords
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import string
import wget
from pdfminer.high_level import extract_text

url = 'https://yourAddressOnTheDdfFile/pdf'

def downloadPDF(url):
    file = wget.download(url, "C:\yourHomeDirectoryForSaveFile.pdf")
#downloadPDF(url)

convertPDFtoTXT = extract_text('C:\yourHomeDirectoryForSaveFile.pdf')
fileTxt = open(f"fileTxt.txt", "w+", encoding='UTF-8')
fileTxt.write(convertPDFtoTXT)
documentTxtOpen = open(f"C:\yourHomeDirectoryForSaveFile/fileTxt.txt", "r+", encoding='UTF-8')
documentTxtRead = documentTxtOpen.read()
documentTxtToLower = documentTxtRead.lower()
spec_chars = string.punctuation + "\n\xa0«»\t—…"
documentRemoveChars = "".join([char for char in documentTxtToLower if char not in spec_chars])
documentTokenize = word_tokenize(documentRemoveChars)
documentToText = nltk.Text(documentTokenize)
russian_stopwords = stopwords.words('russian')
textWithOutStopWordsRussian = [word for word in documentTokenize if not word in russian_stopwords]
final_raw = " ".join(textWithOutStopWordsRussian)
wordcloud = WordCloud(background_color='white', max_words=200, max_font_size=30, scale=3).generate(final_raw)
fig = plt.figure(1, figsize=(12, 12))
plt.axis('off')
plt.imshow(wordcloud)
plt.show()
