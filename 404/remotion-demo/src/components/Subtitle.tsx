import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {subtitles} from '../audio-config';

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  
  // 現在のフレームで表示すべき字幕を検索
  const currentSubtitle = subtitles.find(
    sub => frame >= sub.startFrame && frame < sub.endFrame
  );
  
  if (!currentSubtitle) return null;
  
  // フェードイン・フェードアウトのアニメーション
  const opacity = interpolate(
    frame,
    [
      currentSubtitle.startFrame,
      currentSubtitle.startFrame + 10,
      currentSubtitle.endFrame - 10,
      currentSubtitle.endFrame
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  // 下からスライドインするアニメーション
  const translateY = interpolate(
    frame,
    [currentSubtitle.startFrame, currentSubtitle.startFrame + 10],
    [20, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    }
  );
  
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        left: '50%',
        transform: `translateX(-50%) translateY(${translateY}px)`,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '16px 32px',
        borderRadius: 8,
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        maxWidth: '80%',
        textAlign: 'center',
        opacity,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      {currentSubtitle.text}
    </div>
  );
};