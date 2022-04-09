import { WCAEvent } from '../../types';

const importSolves = (eventName: WCAEvent) => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';
  fileInput.click();

  fileInput.addEventListener('change', (e) => {
    e.preventDefault();
    let fileExists = fileInput.files && fileInput.files.length > 0; //@ts-ignore
    let file = fileExists ? fileInput.files[0] : null;

    if (file) {
      let reader = new FileReader();

      reader.addEventListener('load', (e) => {
        let solves = String(e.target?.result);
        solves && localStorage.setItem(eventName, solves);
      });

      reader.addEventListener('error', (e) => {
        alert('Error: Failed to read file.');
      });

      reader.readAsText(file);
    }
  });
};

export default importSolves;
