export default function ErrorHandler() {
  try {
    return null;
  } catch (error) {
    console.log('ERROR', error);
  }
}
