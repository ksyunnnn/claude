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
  
  const backgroundRotation = interpolate(
    frame,
    [0, durationInFrames],
    [0, 360]
  );
  
  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `linear-gradient(${backgroundRotation}deg, #f3f4f6, #e5e7eb, #f3f4f6)`,
        }}
      />
      
      {audioSegments.map((segment) => (
        <Sequence
          key={segment.id}
          from={segment.startFrame}
          durationInFrames={segment.durationFrames}
        >
          <Audio src={staticFile(segment.filename)} />
        </Sequence>
      ))}
      
      {/* シーン1: 登壇者紹介 (0-300 frames / 0-10秒) */}
      <Sequence from={0} durationInFrames={300}>
        <IntroductionScene />
      </Sequence>
      
      {/* シーン2: プロダクト紹介 (300-750 frames / 10-25秒) */}
      <Sequence from={300} durationInFrames={450}>
        <ProductIntroScene />
      </Sequence>
      
      {/* シーン3: 技術デモ (750-1200 frames / 25-40秒) */}
      <Sequence from={750} durationInFrames={450}>
        <TechDemoScene />
      </Sequence>
      
      {/* シーン4: 協業履歴 (1200-1650 frames / 40-55秒) */}
      <Sequence from={1200} durationInFrames={450}>
        <CollaborationScene />
      </Sequence>
      
      {/* シーン5: 結論・CTA (1650-1800 frames / 55-60秒) */}
      <Sequence from={1650} durationInFrames={150}>
        <ConclusionScene />
      </Sequence>
      
      <Subtitle />
    </AbsoluteFill>
  );
};

// シーン1: 登壇者紹介
const IntroductionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const titleScale = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 200 },
  });
  
  const avatarScale = spring({
    fps,
    frame: frame - 30,
    config: { damping: 100, stiffness: 150 },
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 40,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transform: `scale(${titleScale})`,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          ハッカソン成果発表
        </h1>
        
        {frame > 60 && (
          <div
            style={{
              transform: `scale(${avatarScale})`,
              opacity: avatarScale,
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                backgroundColor: '#4B5563',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                border: '4px solid white',
              }}
            >
              👨‍💻
            </div>
            <div style={{
              fontSize: 32,
              color: '#6B7280',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginBottom: 15,
            }}>
              登壇者：こばしゅん@ksyunnnn
            </div>
            <div style={{
              fontSize: 28,
              color: '#EF4444',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 'bold',
            }}>
              （本人は帰宅済み）
            </div>
          </div>
        )}
        
        {frame > 150 && (
          <div style={{
            fontSize: 40,
            color: '#3B82F6',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            marginTop: 30,
            transform: `translateY(${interpolate(frame, [150, 200], [30, 0])})`,
            opacity: interpolate(frame, [150, 200], [0, 1]),
          }}>
            代わりに動画が発表します
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// シーン2: プロダクト紹介
const ProductIntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 200 },
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 120,
            marginBottom: 30,
            transform: `scale(${logoScale})`,
            color: '#4B5563',
          }}
        >
          &gt;&gt;
        </div>
        
        <h1
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 40,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1.2,
          }}
        >
          Claude Code<br />
          スラッシュコマンド共有サービス
        </h1>
        
        {frame > 100 && (
          <div style={{
            backgroundColor: 'white',
            padding: 30,
            borderRadius: 16,
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            transform: `translateY(${interpolate(frame, [100, 150], [30, 0])})`,
            opacity: interpolate(frame, [100, 150], [0, 1]),
          }}>
            <div style={{
              fontSize: 36,
              color: '#3B82F6',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
              🤖 + 👨‍💻 協業開発
            </div>
            <div style={{
              fontSize: 24,
              color: '#6B7280',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              Claude Code自身が設計・実装に参加
            </div>
          </div>
        )}
        
        {frame > 200 && (
          <div style={{
            marginTop: 40,
            fontSize: 28,
            color: '#10B981',
            fontFamily: 'Monaco, Consolas, monospace',
            transform: `scale(${interpolate(frame, [200, 250], [0.8, 1])})`,
            opacity: interpolate(frame, [200, 250], [0, 1]),
          }}>
            https://www.slash-commands.com/
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// シーン3: 技術デモ
const TechDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const techStack = [
    { name: 'Next.js 15', color: '#000000', icon: '⚡', desc: 'App Router + RSC' },
    { name: 'Supabase', color: '#3ECF8E', icon: '🗄️', desc: 'PostgreSQL + Auth' },
    { name: 'TypeScript', color: '#3178C6', icon: '📝', desc: '完全型安全' },
    { name: 'Tailwind CSS', color: '#06B6D4', icon: '🎨', desc: 'モダンスタイル' }
  ];
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <h2
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            color: '#1F2937',
            textAlign: 'center',
            marginBottom: 50,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          最新技術スタック
        </h2>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40,
          }}
        >
          {techStack.map((tech, i) => {
            const delay = i * 30;
            const progress = spring({
              fps,
              frame: frame - delay,
              config: { damping: 100, stiffness: 200 },
            });
            
            if (frame < delay) return null;
            
            return (
              <div
                key={tech.name}
                style={{
                  backgroundColor: 'white',
                  padding: 35,
                  borderRadius: 20,
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  transform: `translateY(${(1 - progress) * 60}px) scale(${progress})`,
                  opacity: progress,
                  border: `3px solid ${tech.color}30`,
                }}
              >
                <div style={{
                  fontSize: 60,
                  marginBottom: 20,
                  textAlign: 'center',
                }}>
                  {tech.icon}
                </div>
                <h3
                  style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    color: tech.color,
                    textAlign: 'center',
                    marginBottom: 10,
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                  }}
                >
                  {tech.name}
                </h3>
                <p style={{
                  fontSize: 18,
                  color: '#6B7280',
                  textAlign: 'center',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>
        
        {frame > 200 && (
          <div style={{
            textAlign: 'center',
            marginTop: 50,
            transform: `translateY(${interpolate(frame, [200, 250], [30, 0])})`,
            opacity: interpolate(frame, [200, 250], [0, 1]),
          }}>
            <div style={{
              backgroundColor: '#0D1117',
              color: '#10B981',
              padding: 20,
              borderRadius: 12,
              fontSize: 24,
              fontFamily: 'Monaco, Consolas, monospace',
              display: 'inline-block',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            }}>
              $ npm run dev -- --turbo
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// シーン4: 協業履歴の凄さ
const CollaborationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const stats = [
    { label: '総コード行数', value: '15,000', icon: '📝', color: '#3B82F6' },
    { label: 'コミット数', value: '47', icon: '🔄', color: '#10B981' },
    { label: '開発期間', value: '5日', icon: '⏱️', color: '#F59E0B' },
    { label: 'ADR記録', value: '7', icon: '📋', color: '#8B5CF6' },
  ];
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
      }}
    >
      <div style={{ textAlign: 'center', width: '100%', maxWidth: 1200 }}>
        <h2
          style={{
            fontSize: 70,
            fontWeight: 'bold',
            color: '#1F2937',
            marginBottom: 50,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          🤖 + 👨‍💻 協業実績
        </h2>
        
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 40,
            marginBottom: 50,
          }}
        >
          {stats.map((stat, i) => {
            const delay = i * 25;
            const progress = spring({
              fps,
              frame: frame - delay,
              config: { damping: 100, stiffness: 200 },
            });
            
            if (frame < delay) return null;
            
            return (
              <div
                key={stat.label}
                style={{
                  backgroundColor: 'white',
                  padding: 35,
                  borderRadius: 20,
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                  transform: `translateY(${(1 - progress) * 50}px) scale(${progress})`,
                  opacity: progress,
                  border: `3px solid ${stat.color}30`,
                }}
              >
                <div style={{
                  fontSize: 60,
                  marginBottom: 15,
                  textAlign: 'center',
                }}>
                  {stat.icon}
                </div>
                <div style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: stat.color,
                  textAlign: 'center',
                  marginBottom: 10,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 22,
                  color: '#6B7280',
                  textAlign: 'center',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
        
        {frame > 150 && (
          <div style={{
            backgroundColor: '#FEF3C7',
            padding: 30,
            borderRadius: 16,
            border: '3px solid #F59E0B',
            transform: `scale(${interpolate(frame, [150, 200], [0.8, 1])})`,
            opacity: interpolate(frame, [150, 200], [0, 1]),
          }}>
            <div style={{
              fontSize: 36,
              fontWeight: 'bold',
              color: '#D97706',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              marginBottom: 15,
            }}>
              🏆 革新的な開発手法を確立
            </div>
            <div style={{
              fontSize: 24,
              color: '#92400E',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              ADRシステム・Remotion動画制作・完全型安全
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// シーン5: 結論・CTA
const ConclusionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  
  const logoScale = spring({
    fps,
    frame,
    config: { damping: 100, stiffness: 300 },
  });
  
  const ctaScale = spring({
    fps,
    frame: frame - 30,
    config: { damping: 100, stiffness: 250 },
  });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: 60,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 100,
            marginBottom: 30,
            transform: `scale(${logoScale})`,
            color: 'white',
            textShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          }}
        >
          &gt;&gt;
        </div>
        
        <h1
          style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 30,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          今すぐ体験可能
        </h1>
        
        {frame > 30 && (
          <div
            style={{
              background: 'white',
              color: '#4B5563',
              padding: '25px 50px',
              borderRadius: 20,
              fontSize: 36,
              fontWeight: 'bold',
              display: 'inline-block',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              transform: `scale(${ctaScale})`,
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              border: '3px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            slash-commands.com
          </div>
        )}
        
        {frame > 80 && (
          <div style={{
            marginTop: 30,
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.9)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            transform: `translateY(${interpolate(frame, [80, 120], [20, 0])})`,
            opacity: interpolate(frame, [80, 120], [0, 1]),
          }}>
            💡 この動画もClaude Codeが生成
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};