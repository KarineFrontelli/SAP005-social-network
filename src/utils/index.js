export const parse = (htmlString) => {
  const fragment = document.createElement('div');
  fragment.innerHTML = htmlString;
  return fragment.firstElementChild;
};
