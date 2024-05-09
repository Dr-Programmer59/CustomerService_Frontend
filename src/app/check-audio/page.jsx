// pages/index.js
'use client'
import { useState, useRef } from 'react';

export default function Home() {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const audioRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      
      const chunks = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
      };

      mediaRecorder.start();
      setRecording(true);

      setTimeout(() => {
        mediaRecorder.stop();
        setRecording(false);
      }, 5000); // 5 seconds recording time, you can adjust as needed
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const sendAudioToBackend = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('audio', audioBlob);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/audio`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          console.log('Audio uploaded successfully');
          // Handle success as needed
        } else {
            console.log(response)
          console.error('Failed to upload audio');
          // Handle failure as needed
        }
      } catch (error) {
        console.error('Error uploading audio:', error);
        // Handle error as needed
      }
    }
  };

  const handlePlay = () => {
    if (audioBlob) {
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioURL;
      audioRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        {recording ? 'Recording...' : 'Start Recording'}
      </button>
      <button onClick={sendAudioToBackend} disabled={!audioBlob}>
        Send Audio to Backend
      </button>
      <button onClick={handlePlay} disabled={!audioBlob}>
        Play Recorded Audio
      </button>
      <audio ref={audioRef} controls />
    </div>
  );
}
