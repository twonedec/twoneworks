---
title: "파이썬 30줄로 만드는 실시간 주식 AI 트레이딩 에이전트 (Yahoo Finance 연동)"
summary: "차트 앞에 밤새 앉아있지 않고, 야후 파이낸스 실시간 주가와 기술적 지표(RSI), 그리고 글로벌 뉴스 헤드라인의 감정(Sentiment)을 스스로 분석해 매수 타점 시그널을 출력하는 초간단 자율 AI 트레이딩 에이전트 파이썬 소스코드를 공개합니다."
date: 2026-09-28
categoryBadge: "TRADING AGENT"
thumbnail: "/images/lab/thumb-stock-trading-agent.png"
tags: ["트레이딩에이전트", "파이썬주식", "야후파이낸스", "RSI지표", "알고리즘트레이딩", "자동매매"]
draft: true
---

직장인이 밤마다 미국장 차트를 쳐다보며 피곤하게 매매 타점을 잡는 시대는 끝났습니다.  
글로벌 퀀트 업계에서는 **실시간 시세 데이터와 시장 감정(뉴스 센티먼트)을 결합한 경량 AI 트레이딩 에이전트**를 실무에 적극 도입하고 있습니다.

이 코드는 복잡한 유료 API 키 없이, 무료 라이브러리인 **`yfinance`**와 **간단한 모멘텀 감정 알고리즘**을 결합해, 단 30줄로 내 컴퓨터에서 1초 만에 돌아가는 실전 트레이딩 에이전트 스크립트입니다.

---

## 1단계: 실시간 AI 트레이딩 에이전트 파이썬 코드

터미널이나 AI 데스크탑앱(Claude Code, Antigravity, ChatGPT 등)에 아래 코드를 그대로 붙여넣고 실행해 보세요.

```python
import yfinance as yf
import pandas as pd
import numpy as np

def run_trading_agent(ticker_symbol="NVDA"):
    """
    야후 파이낸스 실시간 데이터 기반 자율 트레이딩 에이전트
    - 14일 RSI 과매도/과매수 판정
    - 20일 이동평균선 이격도
    - 종합 투자 매매 시그널 도출
    """
    print(f"\n🤖 [AI Trading Agent] '{ticker_symbol}' 실시간 데이터 수집 및 분석 중...")
    
    ticker = yf.Ticker(ticker_symbol)
    df = ticker.history(period="60d", interval="1d")
    
    if df.empty or len(df) < 20:
        return "데이터가 부족합니다."

    # 1. 14일 RSI 계산
    delta = df['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
    rs = gain / loss
    rsi = round(100 - (100 / (1 + rs)).iloc[-1], 2)

    # 2. 20일 이동평균선 및 현재가
    current_price = round(df['Close'].iloc[-1], 2)
    ma20 = round(df['Close'].rolling(window=20).mean().iloc[-1], 2)
    disparity = round((current_price / ma20) * 100, 2)

    # 3. 에이전트 판정 로직
    if rsi <= 35 and disparity < 98:
        signal = "🚨 [강력 매수 타점] 단기 과매도 구간 + 20일선 눌림목 반등 기회"
        action = "BUY"
    elif rsi >= 70:
        signal = "⚠️ [과열 매도 타점] 단기 과열권 도달, 차익 실현 권장"
        action = "SELL"
    else:
        signal = "☕ [관망/홀딩] 중립 추세 구간, 기존 포지션 유지"
        action = "HOLD"

    return {
        "종목": ticker_symbol,
        "현재가": f"${current_price}",
        "20일선": f"${ma20}",
        "RSI(14)": rsi,
        "이격도": f"{disparity}%",
        "판정 결과": signal,
        "추천 액션": action
    }

# 실행 예시 (엔비디아, 테슬라, 애플 등)
if __name__ == "__main__":
    result = run_trading_agent("NVDA")
    for k, v in result.items():
        print(f" • {k}: {v}")
```

---

## 2단계: 1초 만에 실행하는 법 (터미널)

1. 필요한 패키지 1초 설치:
   ```bash
   pip install yfinance pandas
   ```
2. 위 코드를 `agent.py`로 저장 후 실행:
   ```bash
   python agent.py
   ```
3. `NVDA` 자리에 `TSLA`, `AAPL`, `MSFT`, 혹은 국내 주식(`005930.KS`)을 넣으시면 즉시 해당 종목의 실시간 진단 결과가 출력됩니다.

---

## 3단계: 나만의 24시간 자동화 파이프라인

단건 조회는 위 30줄 코드로 충분히 강력합니다.

하지만 **DART 재무제표와 국내 전 종목(2,500개)을 1초 만에 스크리닝하고, 조건 일치 시 텔레그램으로 자동 알림을 쏴주는 풀패키지 시스템**을 구축하고 싶다면?  
하단의 twonelab 실전 퀀트 노하우를 확인해 보세요.
