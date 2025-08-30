import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from 'remotion';
import {audioSegments, FPS} from './audio-config';
import {Subtitle} from './components/Subtitle';

export const AdvancedDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  
  // 背景のグラデーションアニメーション
  const backgroundRotation = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360]
  );
  
  return (
    <AbsoluteFill>
      {/* アニメーション背景 */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(${backgroundRotation}deg, #f3f4f6, #e5e7eb, #f3f4f6)`,
        }}
      />
      
      {/* 音声トラック */}
      {audioSegments.map((segment) => (
        <Sequence
          key={segment.id}
          from={segment.startFrame}
          durationInFrames={segment.durationFrames}
        >
          <Audio src={staticFile(segment.filename)} />
        </Sequence>
      ))}
      
      {/* シーン1: タイトル (0-90 frames) */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene />
      </Sequence>
      
      {/* シーン2: 機能紹介 (90-240 frames) */}
      <Sequence from={90} durationInFrames={150}>
        <FeaturesScene />
      </Sequence>
      
      {/* シーン3: デモ (240-360 frames) */}
      <Sequence from={240} durationInFrames={120}>
        <DemoScene />
      </Sequence>
      
      {/* シーン4: CTA (360-450 frames) */}
      <Sequence from={360} durationInFrames={90}>
        <CTAScene />
      </Sequence>
      
      {/* 字幕 */}
      <Subtitle />
    </AbsoluteFill>
  );
};

// タイトルシーン
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });
  
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <h1
          style={{
            fontSize: 100,
            fontWeight: 'bold',
            color: '#4B5563',
            marginBottom: 20,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Command Share
        </h1>
        <div
          style={{
            fontSize: 40,
            color: '#6B7280',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <TypeWriter text="コマンドラインの知識を共有しよう" />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 機能紹介シーン
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const features = [
    {icon: '📝', title: 'コマンドを共有', desc: '便利なコマンドを簡単に共有'},
    {icon: '👥', title: 'フォロー機能', desc: '他のユーザーをフォローして学ぼう'},
    {icon: '⚡', title: '高速検索', desc: '必要なコマンドをすぐに見つける'},
    {icon: '🔐', title: 'GitHub認証', desc: '安全で簡単なログイン'},
  ];
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 100,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
          width: '100%',
          maxWidth: 1200,
        }}
      >
        {features.map((feature, i) => {
          const delay = i * 10;
          const progress = spring({
            fps,
            frame: frame - delay,
            config: {
              damping: 100,
              stiffness: 200,
            },
          });
          
          return (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                padding: 40,
                borderRadius: 16,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                transform: `translateY(${(1 - progress) * 100}px) scale(${progress})`,
                opacity: progress,
              }}
            >
              <div style={{fontSize: 60, marginBottom: 20}}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: 32,
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: 8,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: 20,
                  color: '#6B7280',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// デモシーン
const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 100,
    },
  });
  
  // タイピングエフェクト
  const commandLength = Math.floor(interpolate(
    frame,
    [20, 50],
    [0, '$ git branch --show-current'.length],
    {
      extrapolateRight: 'clamp',
    }
  ));
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: 20,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          padding: 50,
          width: '80%',
          maxWidth: 900,
          transform: `scale(${scale})`,
        }}
      >
        <div
          style={{
            backgroundColor: '#1F2937',
            color: '#10B981',
            padding: 30,
            borderRadius: 12,
            fontFamily: 'Monaco, Consolas, monospace',
            fontSize: 24,
            marginBottom: 30,
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{marginBottom: 16}}>
            {'$ git branch --show-current'.substring(0, commandLength)}
            <span
              style={{
                opacity: Math.sin(frame * 0.1) > 0 ? 1 : 0,
                marginLeft: 2,
              }}
            >
              |
            </span>
          </div>
          {frame > 60 && (
            <div style={{opacity: 0.7, color: '#34D399'}}>
              feature/typescript-any-elimination
            </div>
          )}
        </div>
        
        {frame > 80 && (
          <div style={{display: 'flex', gap: 16, marginBottom: 20}}>
            <Tag color="#3B82F6" text="#git" />
            <Tag color="#10B981" text="#branch" />
          </div>
        )}
        
        {frame > 90 && (
          <p
            style={{
              color: '#6B7280',
              fontSize: 20,
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: 1.6,
            }}
          >
            現在のブランチ名を表示するコマンド
          </p>
        )}
      </div>
    </AbsoluteFill>
  );
};

// CTAシーン
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const scale = spring({
    fps,
    frame,
    config: {
      damping: 100,
      stiffness: 200,
    },
  });
  
  const buttonScale = spring({
    fps,
    frame: frame - 30,
    config: {
      damping: 100,
      stiffness: 300,
    },
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scale})`,
        }}
      >
        <h2
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#4B5563',
            marginBottom: 40,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          今すぐ始めよう
        </h2>
        <div
          style={{
            backgroundColor: '#4B5563',
            color: 'white',
            padding: '24px 48px',
            borderRadius: 16,
            fontSize: 36,
            fontWeight: 'bold',
            display: 'inline-block',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transform: `scale(${buttonScale})`,
            boxShadow: '0 10px 25px rgba(75, 85, 99, 0.3)',
            cursor: 'pointer',
          }}
        >
          command-share.app
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ヘルパーコンポーネント: タイプライター効果
const TypeWriter: React.FC<{text: string}> = ({text}) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.floor(
    interpolate(frame, [20, 70], [0, text.length], {
      extrapolateRight: 'clamp',
    })
  );
  
  return <>{text.substring(0, charsToShow)}</>;
};

// ヘルパーコンポーネント: タグ
const Tag: React.FC<{color: string; text: string}> = ({color, text}) => {
  const frame = useCurrentFrame();
  const scale = spring({
    fps: 30,
    frame,
    config: {
      damping: 100,
      stiffness: 400,
    },
  });
  
  return (
    <span
      style={{
        backgroundColor: `${color}20`,
        color: color,
        padding: '10px 20px',
        borderRadius: 10,
        fontSize: 20,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: 600,
        transform: `scale(${scale})`,
        display: 'inline-block',
      }}
    >
      {text}
    </span>
  );
};