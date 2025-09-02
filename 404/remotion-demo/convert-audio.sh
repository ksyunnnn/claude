#!/bin/bash

# AIFF形式の音声ファイルをWAV形式に変換（ffmpeg不要）
# macOSのafconvertを使用

echo "Converting AIFF to WAV format..."

cd public

for i in {1..4}; do
    if [ -f "narration-${i}.aiff" ]; then
        echo "Converting narration-${i}.aiff to WAV..."
        afconvert -f WAVE -d LEI16 "narration-${i}.aiff" "narration-${i}.wav"
        if [ $? -eq 0 ]; then
            echo "Successfully converted narration-${i}.aiff to WAV"
        else
            echo "Error converting narration-${i}.aiff"
        fi
    fi
done

echo "Conversion complete!"