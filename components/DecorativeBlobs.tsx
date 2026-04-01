export default function DecorativeBlobs() {
  return (
    <>
      {/* Top-left blob - pink/rose */}
      <div className="fixed top-0 left-0 w-64 h-64 opacity-40 pointer-events-none -z-0 overflow-hidden">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#E9CCDB" d="M38.5,-57.8C49.3,-46.9,56.7,-33.5,61.3,-18.8C65.9,-4.2,67.7,11.8,62.4,24.8C57.1,37.9,44.7,48,31.1,55.3C17.5,62.5,2.6,66.9,-13.7,66.1C-30,65.3,-47.7,59.3,-58.4,47.4C-69.1,35.4,-72.7,17.7,-70.5,1.3C-68.3,-15.1,-60.2,-30.2,-49.2,-41.2C-38.2,-52.2,-24.3,-59,-9.1,-61.3C6.1,-63.5,27.7,-68.7,38.5,-57.8Z" transform="translate(80 80)" />
        </svg>
      </div>

      {/* Top-right blob - mint green */}
      <div className="fixed top-0 right-0 w-72 h-72 opacity-50 pointer-events-none -z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#EEF2DC" d="M44.5,-62.6C55.3,-53.4,59.3,-37.2,63.1,-21.8C66.9,-6.4,70.5,8.2,67,21.5C63.5,34.8,52.9,46.8,40.2,55.1C27.4,63.4,12.6,68,-1.4,69.8C-15.4,71.7,-28.9,70.9,-39.6,63.4C-50.3,55.9,-58.3,41.7,-62.8,26.7C-67.3,11.7,-68.4,-4,-63.7,-17.7C-59,-31.5,-48.5,-43.5,-36.5,-52.3C-24.4,-61.1,-10.9,-66.8,3.1,-71.1C17.1,-75.4,33.7,-71.8,44.5,-62.6Z" transform="translate(110 90)" />
        </svg>
      </div>

      {/* Bottom-left blob - peach/orange */}
      <div className="fixed bottom-0 left-0 w-80 h-80 opacity-35 pointer-events-none -z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#EEAE91" d="M54.3,-63.5C67.4,-53.5,71.9,-33.7,73.7,-14.3C75.5,5.1,74.7,24,67,40.2C59.3,56.4,44.7,70,27.8,76C10.9,82,-8.3,80.5,-24.1,72.8C-39.9,65.1,-52.3,51.3,-60.1,35.5C-67.9,19.7,-71.1,1.9,-67.4,-13.5C-63.7,-28.9,-53.1,-41.8,-40.4,-52C-27.7,-62.2,-12.8,-69.8,4.5,-74.9C21.8,-80,41,-73.5,54.3,-63.5Z" transform="translate(80 130)" />
        </svg>
      </div>

      {/* Bottom-right blob - blue/slate */}
      <div className="fixed bottom-0 right-0 w-72 h-72 opacity-20 pointer-events-none -z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path fill="#5D6D8F" d="M40.3,-52.7C51.6,-45.7,59.4,-32.3,63.5,-17.6C67.7,-2.9,68.2,13.1,62.3,26.6C56.4,40.1,44.1,51.2,30.3,58.5C16.5,65.8,1.2,69.4,-14.6,67.7C-30.4,66.1,-46.7,59.3,-55.8,47.5C-64.9,35.7,-66.8,18.8,-65.5,2.7C-64.2,-13.4,-59.7,-28.9,-50.7,-40.4C-41.7,-51.8,-28.2,-59.2,-13.8,-63.2C0.6,-67.2,29,-59.7,40.3,-52.7Z" transform="translate(120 130)" />
        </svg>
      </div>
    </>
  )
}
