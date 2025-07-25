---
analysis_mode: comprehensive
category: 主題演講
date: '2025-07-18'
draft: false
layout: single
seminar: 202506 AICon Beijing
session_id: e53a6872-069f-49fc-821a-43f324666ec0_Infinity视觉自回归生成新路线
tags:
- 數據
- 雲端
- AI
- DevOps
- 202506 AICon Beijing
- 主題演講
template_style: professional
title: Infinity：视觉自回归生成新路线
type: posts
---

## 會議資訊
- **研討會：** 202506 AICon Beijing
- **類型：** 主題演講
- **來源：** [https://aicon.infoq.cn/2025/beijing/presentation/6512](https://aicon.infoq.cn/2025/beijing/presentation/6512)

---

## 報告內容

## Infinity：視覺自回歸生成新路線——全方位綜合分析報告

### 執行摘要

本報告針對字節跳動韓劍在 2025 年 AiCon 全球人工智能開發與應用大會上的主題演講《Infinity：視覺自回歸生成新路線》的 PPT 內容進行深度分析。Infinity 提出了一個開創性的視覺自回歸生成模型，透過「位元建模框架」的核心創新，顯著克服了傳統自回歸模型在高品質圖像生成、速度及穩定性方面的瓶頸。其核心技術包括「位元分詞器」和「位元自校正」機制，使得 Infinity 在多個關鍵圖像生成基準測試上超越了主流擴散模型（如 DiT、SD3 和 DALL-E 3），並展現出驚人的推理速度。本報告將從會議概述、技術要點、商業價值、創新亮點及趨勢洞察五個維度，為各類讀者提供全面而深入的分析。

---

### 1. 會議概述與核心內容

**會議背景與演講主題：**
本次演講是 2025 年 AiCon 全球人工智能開發與應用大會的主題演講，由字節跳動的 AIGC 算法工程師韓劍發佈。演講的核心是介紹名為「Infinity」的視覺自回歸生成模型，該研究工作已獲選為 CVPR2025 的 Oral 論文，顯示其在學術界的認可度。

**核心問題與模型目標：**
簡報開宗明義地指出，現有的視覺自回歸模型在生成高品質圖像方面顯著遜於最先進的擴散模型，並面臨諸多挑戰，包括：
1.  **高分辨率圖像合成性能不足。**
2.  **未能展現與大型語言模型 (LLMs) 相同的規模化法則特性。**
3.  **柵格掃描順序導致預測速度慢。**
4.  **柵格掃描喪失全局信息，不夠自然。**
5.  **離散重建質量差，難以保留高頻細節。**
6.  **教師強制訓練導致的累積誤差問題。**

「Infinity」模型的目標正是要突破這些限制，重新定義視覺自回歸生成的新路徑，使其在高質量、高效率的圖像生成方面，不僅能與擴散模型匹敵，甚至超越現有領先模型。

**簡報結構：**
PPT 內容邏輯清晰，分為四個主要章節：
1.  **自回歸模型和 Scaling Law：** 介紹自回歸模型基本概念及面臨的挑戰。
2.  **視覺自回歸 v.s. 擴散模型：** 對比兩種主流生成範式，並引出 Infinity 所屬的 VAR（視覺自回歸）模型基礎。
3.  **Infinity: 視覺自回歸生成新路線：** 詳細闡述 Infinity 的核心技術創新及其如何解決上述挑戰。
4.  **分析和思考：** 總結 Infinity 的貢獻和未來展望。

值得一提的是，簡報中包含兩頁「極客邦科技 2025 年會議規劃」的廣告頁，雖然非技術內容，但表明了此會議的商業合作與生態推廣屬性。

---

### 2. 技術要點與實現細節

Infinity 的技術核心在於對傳統視覺自回歸模型進行了範式革新，尤其是在圖像分詞器和錯誤校正機制上的突破。

**2.1 視覺自回歸模型的基礎與挑戰**

*   **自回歸序列建模：** 核心概念是透過序列的前 N-1 個元素預測第 N 個元素。圖像透過編碼器（如 VAE/VQ-VAE）壓縮並離散化為視覺詞元序列。
*   **傳統挑戰：** 主要源於其「柵格掃描順序」的像素或詞元預測方式，導致速度慢、無法捕捉全局信息、以及累積誤差問題。簡報中提及的 iGPT、VQVAE、VQGAN、Parti 等模型均屬於此範疇。
*   **VAR 的新順序：粗到細生成 (Coarse-to-fine)：** Infinity（以及其前身 VAR）採用了「下一尺度（或下一分辨率）預測」的生成方式，模擬人類從整體到細節的感知過程，這是一種更自然的圖像生成順序，能更好地保留全局上下文。

**2.2 Infinity 的核心技術創新**

Infinity 模型的關鍵突破在於其全新的「位元建模框架」，旨在解決傳統視覺自回歸模型的三大核心挑戰：離散重建差、累積誤差和高分辨率生成。

*   **2.2.1 位元分詞器 (Bitwise Tokenizer) - 核心解決方案：**
    *   **問題：** 傳統的索引式離散分詞器（如 VQVAE）由於詞彙量有限，存在顯著的量化誤差，尤其在高頻紋理細節的保留上表現不佳。
    *   **創新點：** Infinity 引入了「位元分詞器」，特別是採用了**二進制球面量化 (Binary Spherical Quantization, BSQ)**。
        *   **BSQ 原理：** 與傳統 VQ 依賴固定 CodeBook 不同，BSQ 將連續特徵直接量化為一系列的二進制位元（+1 或 -1）。這意味著不再是預測單一的離散索引，而是預測 D 個二進制位元。
        *   **無限詞彙分類器：** 透過預測 D 個位元，而非 2^D 個索引，本質上提供了「無限」的詞彙量，遠超任何固定大小的 CodeBook。這使得模型能夠以極高的精細度捕捉圖像細節。
    *   **技術實現：** 包含投影、L2 範數和二進制量化等步驟。
    *   **效果：** 數據顯示（Page 26），當詞彙量（即位元數量 2^k）從 2^16 擴展到 2^64 時，ImageNet-rFID 值持續下降，尤其在 Vd=2^64 時達到 0.15，甚至優於 SD 連續 VAE 的 0.87。這證明了位元分詞器在圖像重建和細節保留上的卓越能力。

*   **2.2.2 位元自校正 (Bitwise Self-Correction) - 解決累積誤差：**
    *   **問題：** 自回歸模型在長序列生成中，由於「教師強制訓練」與實際預測偏差，容易產生累積誤差，導致生成圖像不自然（LLMs 也有類似問題）。
    *   **創新點：** Infinity 引入「位元自校正」機制來緩解這一問題。
        *   **機制：** 在訓練過程中，模型會隨機翻轉部分預測的位元，模擬預測誤差。然後，模型會基於這些「有誤」的位元，重新量化殘差特徵，從而自動學習如何糾正之前的錯誤。
    *   **效果：** 定量數據（Page 29）顯示，位元自校正顯著提升了圖像質量。FID 值從 Baseline 的 9.76 大幅降至 3.48，ImageReward 從 0.52 提升至 0.76。定性結果也證明了生成圖像的細節和連貫性顯著改善。

*   **2.2.3 變換器擴展與 Scaling Law 的驗證：**
    *   Infinity 延續了變換器在大型語言模型中已被證實的規模化優勢。簡報展示，隨著模型規模（從 125M 到 4.7B）和訓練計算量的增加，Infinity 的生成質量（ImageReward、HPSv2.1）和真實感（FID）持續提升，驗證了其與 LLMs 類似的 Scaling Law 特性（相關係數 r 接近 -0.98）。

*   **2.2.4 兩階段訓練流程：**
    *   **階段 1：** 在圖像上訓練多尺度 VQVAE，為第二階段提供真實的視覺詞元數據。
    *   **階段 2：** 在這些視覺詞元上訓練 VAR 變換器，採用類似 GPT 的（尺度空間內的自回歸）結構，並使用教師強制和分塊因果遮罩。

*   **2.2.5 直接偏好優化 (DPO)：**
    *   為了進一步提升生成結果的人類偏好對齊，Infinity 還應用了 DPO 技術，透過比較優化前 (before_dpo) 和優化後 (after_dpo) 的圖像，展示了 DPO 對於改善細節和整體美感的有效性。

---

### 3. 商業價值與應用場景

Infinity 的技術突破不僅是學術層面的進步，更蘊含巨大的商業潛力。

**3.1 核心商業價值**

*   **高品質與逼真度：** 在多個基準測試（如 GenEval 和 DPG）上超越 DALL-E 3 和 SD3 等領先模型，特別是在文本一致性、關係理解和全局一致性方面表現卓越。這意味著 Infinity 能夠生成極其逼真、細節豐富且高度符合指令的圖像，大幅提升內容品質。
*   **極致的生成速度：** 在生成 1024x1024 高分辨率圖像時，Infinity 比 Flux-Dev (12B) 快 3.7 到 14 倍（根據模型大小）。這種顯著的速度優勢意味著更低的運算成本、更高的吞吐量和更流暢的用戶體驗，尤其對於需要即時生成或大量內容生成的場景至關重要。
*   **精準的提示詞遵循能力：** 「極強的提示詞遵循能力」和生成圖像中包含清晰文本的能力（如「INF」、「DREAM BIG」）是商業應用中的關鍵優勢。這使得設計師、營銷人員能夠更精確地控制生成內容。
*   **規模化潛力與成本效益：** 遵循 Scaling Law 意味著未來 Infinity 模型性能仍有提升空間。同時，高效的訓練方式（類似 LLMs，單次前向傳播訓練所有時間步長，而非像擴散模型每次一個時間步長）可能帶來更高的學習效率和更低的訓練成本。
*   **開源策略：** Infinity-8B 作為開源模型，將加速技術普及和生態建設，吸引更多開發者基於其進行二次開發和創新，形成更廣泛的應用。

**3.2 廣闊的應用場景**

憑藉其卓越的性能和效率，Infinity 有望在多個行業帶來顛覆性應用：

*   **創意內容生成 (廣告、設計、媒體)：**
    *   **快速生成廣告創意：** 根據文字描述快速生成多樣化的廣告圖片，提升營銷效率。
    *   **藝術與設計輔助：** 協助設計師快速產出概念圖、草圖或材質紋理，縮短設計週期。
    *   **遊戲與影視產業：** 快速生成遊戲資產、場景、角色概念圖或影片分鏡。
    *   **插畫與漫畫：** 自動生成符合風格的插畫內容。
*   **電子商務與零售：**
    *   **產品圖片生成：** 根據文字描述或產品特徵生成多角度、多場景的產品圖片，無需實物拍攝。
    *   **虛擬試穿/試戴：** 為消費者提供個性化的虛擬試穿體驗。
    *   **個性化推薦視覺化：** 根據用戶偏好生成定制化商品展示。
*   **數字人與元宇宙：**
    *   **虛擬形象與場景構建：** 快速生成多樣化的數字人形象、服飾和元宇宙中的虛擬建築、景觀。
    *   **用戶生成內容 (UGC)：** 賦能普通用戶透過簡單文字生成高質量視覺內容。
*   **教育與培訓：**
    *   **視覺化教材：** 根據教學內容自動生成圖表、插圖，提升學習效率和趣味性。
    *   **模擬訓練：** 生成多樣化的訓練場景，用於自動駕駛、機器人等領域的模擬。
*   **個性化與娛樂：**
    *   **社交媒體內容：** 用戶可快速生成獨特的頭像、表情包或分享圖片。
    *   **個性化禮品設計：** 生成定制化圖像用於印刷品、紀念品等。

---

### 4. 創新亮點與技術突破

Infinity 模型的出現，標誌著視覺自回歸生成技術的一次重大飛躍。其核心創新點在於解決了長期困擾該領域的根本性難題。

**4.1 視覺自回歸範式革新：從「像素」到「尺度」的跨越**
傳統自回歸模型常受限於柵格掃描順序，其逐像素或逐詞元預測低效且不自然。Infinity 採用的「粗到細 / 下一尺度預測」的生成方式，更貼近人類感知圖像的習慣，使得模型能先掌握全局上下文，再逐步細化，這是視覺自回歸模型在生成順序上的一個重要突破。

**4.2 位元建模框架：顛覆性創新**
這是 Infinity 最具開創性的技術突破，徹底改變了視覺信息的離散化方式。

*   **無限詞彙分詞器 (Bitwise Tokenizer with BSQ)：**
    *   **突破點：** 告別了固定大小碼本的限制，透過二進制球面量化（BSQ）直接將連續特徵量化為位元。這不僅大幅提升了離散重建質量（超越了 SD 的連續 VAE），尤其在保留高頻紋理細節上表現卓越，還為視覺表徵提供了實質上的「無限詞彙量」。
    *   **影響：** 解決了自回歸模型長期以來在圖像細節表達上的劣勢，使其能夠捕捉極其精細的視覺信息，為高分辨率生成奠定基礎。

*   **位元自校正 (Bitwise Self-Correction)：**
    *   **突破點：** 巧妙地解決了自回歸模型中普遍存在的「教師強制訓練」導致的累積誤差問題。透過在訓練時隨機引入誤差並學習糾正，模型內部產生了強大的魯棒性和自我修復能力。
    *   **影響：** 大幅提高了長序列生成過程的穩定性和圖像的整體連貫性與真實感，彌補了自回歸模型在長序列生成中的固有缺陷。

**4.3 規模化定律的復現與超越**
Infinity 成功證明了視覺自回歸模型也能像 LLMs 一樣遵循 Scaling Law，即透過增加模型規模和計算量，性能可以持續、可預測地提升。這為未來模型的發展提供了清晰的路線圖。

**4.4 性能與效率的雙重領先**
*   **性能超越：** Infinity 首次在多個權威基準測試（FID、IS、GenEval、DPG）上展示了自回歸模型超越頂級擴散模型的實力。這打破了過去幾年「擴散模型獨佔鰲頭」的局面，為生成式 AI 領域注入新的活力和競爭。
*   **效率突破：** 在高分辨率圖像生成方面，Infinity 的速度優勢（比主流擴散模型快數倍甚至十幾倍）是其最直觀的突破。這意味著更高的實用性，特別是對於對延遲敏感的實時應用。

---

### 5. 趨勢洞察與未來展望

Infinity 模型的出現，不僅是單一模型的成功，更揭示了通用人工智能發展的幾個重要趨勢和未來方向。

**5.1 視覺自回歸模型的「復興」與多元化發展**
過去幾年，擴散模型在圖像生成領域獨領風騷。Infinity 的成功證明了自回歸模型仍具有巨大的潛力，並能透過創新架構和訓練方法實現超越。這預示著生成式 AI 領域將出現更多元化的模型架構探索，而非單一技術路線的壟斷。研究人員可能會重新審視自回歸模型，並結合擴散模型或其他方法的優點，探索新的混合範式。

**5.2 大模型規模化能力的通用性**
Infinity 成功將大型語言模型 (LLMs) 中的 Scaling Law 特性引入到視覺自回歸模型中，這強調了變換器架構和規模化訓練在不同模態間的普適性。未來，我們將看到更多跨模態、跨任務的大模型，它們可能共享底層的規模化原則，並在不同領域實現通用智能。

**5.3 AI 生成內容的實時化與成本優化**
隨著生成式 AI 應用越來越普及，對生成速度和成本效率的要求也越來越高。Infinity 在速度上的顯著優勢，精準地契合了這一趨勢。未來，高效的模型將是商業落地的關鍵，無論是雲端服務還是邊緣部署，都將從更快的推理速度中獲益。這將加速 AI 內容生成從實驗室走向大規模商業應用。

**5.4 高度可控性與指令遵循成為核心競爭力**
Infinity 在提示詞遵循、文本生成（Text in Image）和複雜關係理解（DPG 評分）方面的卓越表現，預示著下一代生成模型將更加強調用戶對生成內容的精細控制。用戶不再滿足於「生成一張圖」，而是要求「生成一張具有特定元素、特定風格、甚至特定文字內容的圖」。這種對可控性的追求將推動模型向更強大的多模態理解和規劃能力發展。

**5.5 開源生態的加速與協同創新**
字節跳動將 Infinity-8B 開源，這與當前大模型開源的趨勢一致。開源不僅能加速技術的普及和應用，還能吸引全球開發者共同參與模型的改進和新功能的開發，形成良性循環。這將促使開源模型與閉源商業模型之間的競爭更加激烈，最終受益的是整個 AI 領域的創新速度。

**5.6 未來展望：邁向多模態與更廣泛應用**
*   **視頻生成：** 鑑於 Sora 證明了 DiT 在視頻生成中的潛力，而 Infinity 又超越了 DiT，這暗示 Infinity 的核心思想和架構也有可能拓展到高質量、高效率的視頻生成領域。
*   **3D 與多模態融合：** 未來生成模型將不止步於 2D 圖像，可能會向 3D 內容生成、甚至跨感官多模態（如文本、圖像、聲音、觸覺）方向發展。Infinity 的位元建模思想或許能為這些更複雜的模態提供新的離散化和生成思路。
*   **AI Agent 的視覺能力：** 結合強大的圖像生成能力，未來的 AI Agent 將能更自主地理解、創造和互動視覺信息，進一步推動 AI 在各行業的自動化和智能化水平。

---

### 結論

《Infinity：視覺自回歸生成新路線》的發佈，無疑是生成式 AI 領域的一個里程碑。它不僅證明了視覺自回歸模型在高品質圖像生成方面具備與擴散模型競爭甚至超越的潛力，更透過「位元建模框架」（包括位元分詞器和位元自校正）等一系列創新，為該領域注入了全新的活力和思路。

Infinity 的卓越性能（SOTA 圖像質量、精準提示遵循）和驚人效率（數倍於主流擴散模型的生成速度），使其在學術和商業應用上都具備顛覆性。作為一個開源模型，Infinity 將加速技術的普及和創新，有望在創意產業、電商、遊戲等領域開闢新的商業模式。

總之，Infinity 不僅為視覺自回歸模型帶來了「復興」，也為整個生成式 AI 領域確立了新的性能和效率標杆，預示著一個更加智能、高效且富有創造力的 AI 應用時代的到來。

---

<div style="text-align: center; color: #666; font-size: 0.9em; margin-top: 2em;">
<em>本報告由 NeoTrendHub 自動生成 | 生成時間：2025-07-18 14:10:23</em>
</div>
