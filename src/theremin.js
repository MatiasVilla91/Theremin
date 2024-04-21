import React, { useState, useEffect } from 'react';

function Theremin() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [volume, setVolume] = useState(0);
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const maxX = 400; // Ancho del área del cuadrado
  const maxY = 400; // Alto del área del cuadrado

  const calculateFrequency = (x, y) => {
    const minFrequency = 20; // Frecuencia mínima audible
    const maxFrequency = 2000; // Frecuencia máxima audible
    // Mapear la posición X del cursor al rango de frecuencia
    const frequencyX = (x / maxX) * (maxFrequency - minFrequency) + minFrequency;
    // Mapear la posición Y del cursor al rango de frecuencia
    const frequencyY = ((maxY - y) / maxY) * (maxFrequency - minFrequency) + minFrequency;
    // Sumar las frecuencias de X e Y
    return frequencyX + frequencyY;
  };

  const calculateVolume = (y) => {
    const minVolume = 0; // Volumen mínimo
    const maxVolume = 1; // Volumen máximo
    const factor = 1.5; // Factor de aumento de volumen
    // Mapear la posición Y del cursor al rango de volumen
    return (1 - (y / maxY) * (maxVolume - minVolume) + minVolume) * factor;
  };

  const handleMouseMove = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const calculatedFrequency = calculateFrequency(x, y);
    const calculatedVolume = calculateVolume(y);
    console.log("Frecuencia:", calculatedFrequency);
    console.log("Volumen:", calculatedVolume);
    setFrequency(calculatedFrequency);
    setVolume(calculatedVolume);
  };

  useEffect(() => {
    let oscillator = null;
    let gainNode = null;

    if (isPlaying) {
      oscillator = audioContext.createOscillator();
      gainNode = audioContext.createGain();

      oscillator.type = 'sine'; // Tipo de onda sinusoidal
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);

      gainNode.gain.value = volume;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
    } else {
      if (oscillator) {
        oscillator.stop();
      }
    }

    return () => {
      if (oscillator) {
        oscillator.disconnect();
      }
      if (gainNode) {
        gainNode.disconnect();
      }
    };
  }, [isPlaying, frequency, volume, audioContext]);

  const startPlaying = () => {
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <div className="theremin-container">
      <div className="theremin-area" onMouseMove={handleMouseMove} onMouseEnter={startPlaying} onMouseLeave={stopPlaying}></div>
    </div>
  );
}

export default Theremin;
