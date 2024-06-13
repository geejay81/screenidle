import { Guess } from "@/types/Guess";

const correctBox = '🟩';
const incorrectBox = '🟥';
const nearlyBox = '🟨'
const skippedBox = '🟥';
const blankBox = '⬜';

export const shareContent = (shareData: ShareData) => {

    const copyToClipBoard = (content: string | undefined) => {
      navigator.clipboard.writeText(content || '').then(() => {
        alert("Copied to clipboard!");
      });
    }

    if (navigator?.share) {
      navigator.share(shareData)
        .then(() => console.log('Thanks for sharing!'))
        .catch((e) => {
          if (e.toString().includes('AbortError')) {
            return;
          }
          copyToClipBoard(shareData.text)
        });
    } else {
      copyToClipBoard(shareData.text)
    }
}

export const createShareablePuzzzleBoard = (guesses: Guess[]) => {
    let result = '';

    for (let i = 0; i < guesses.length; i++) {
      switch (guesses[i].result) {
        case 'correct':
          result += correctBox;
          break;
        case 'incorrect':
          result += incorrectBox;
          break;
        case 'nearly':
          result += nearlyBox;
          break;
        case 'skipped':
            result += skippedBox;
            break;
        default:
          result += blankBox;
          break;
      }
    }

    for (let i = 0; i < (6 - guesses.length); i++) {
      result += blankBox;
    }

    return result;
}
