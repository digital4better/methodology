# Technical appendices

## Inventory-based lifetime estimation

### Definitions

**Age** is the time since equipment entered an organisation's inventory, measured to the observation date or retirement date. Previous use requires a separate record.[^context]

**Observed lifetime** is only complete after retirement. For surviving equipment, the convention below estimates an allocation duration from current age and expected lifetime. It is not a mean of fully observed lifetimes or proof of maintenance quality. See the censoring limitations in [Time and ageing](../regles/temporalite-vieillissement-et-versionnement-des-donnees).

**Nominal lifetime** is the organisation's expected duration. It can be used when more representative evidence is unavailable.

For example, a four-year historical accounting schedule could distribute a phone purchased in 2023 over 2023–2026. This describes an inventory convention. In a service LCA, exceeding nominal age does not make manufacturing automatically zero: the allocation lifetime remains explicit, along with revisions and any restatement of earlier years.

:::note[Revising nominal life]
Changing the retained duration from four to five years decreases the annual share but extends the allocation period. Revisions need justification; changing an assumption does not itself demonstrate avoided manufacturing.
:::

**Surviving equipment** remains in the inventory and functional. **Retired equipment** has a retirement date or is permanently withdrawn. Temporary repair or stock status must be distinguished from permanent retirement and from active service.

### Population method

The calculation applies by model, equipment category or fleet, with an explicit population definition.

| Population | Profile | Retained duration |
|---|---|---|
| A | Surviving equipment at or above nominal age | Current age |
| B | Retired before nominal age | Age at retirement |
| C | Surviving equipment below nominal age | Nominal duration, assumed to be reached |
| D | Retired at or above nominal age | Age at retirement |

The mean includes the individual retained durations across **all four populations**. The assumption for C is an expectation, not an observed outcome. A statistical lifetime estimate requires complete cohorts or survival analysis.

### Four-phone example

Fictitious inventory observed in 2024, with four-year nominal life:

| Purchase year | Status | Age | Nominal life | Population | Retained duration |
|---|---|---|---|---|---|
| 2018 | Stock | 6 | 4 | A | 6 |
| 2019 | In use | 5 | 4 | A | 5 |
| 2021 | Retired | 3 | 4 | B | 3 |
| 2022 | In use | 2 | 4 | C | 4 |

Population means are 5.5 years for A, three for B and four for C. No D equipment occurs in this example.

$$
RL=\frac{5.5\times2+3\times1+4\times1}{4}=4.5\text{ years}
$$

This is an **estimated allocation duration**. Time in stock is not necessarily time delivering service.

### Refurbished equipment

Prior use may extend total lifetime. It is recorded separately, alongside refurbishment processes and allocation between successive owners. A longer accounting duration alone does not establish avoided new production.

The example also includes a device acquired in 2023 after three years of prior use:

| Purchase year | Status | Years in organisation | Nominal additional life | Prior use | Population | Retained total life |
|---|---|---|---|---|---|---|
| 2018 | Stock | 6 | 4 | 0 | A | 6 |
| 2019 | In use | 5 | 4 | 0 | A | 5 |
| 2021 | Retired | 3 | 4 | 0 | B | 3 |
| 2022 | In use | 2 | 4 | 0 | C | 4 |
| 2023 | Stock | 1 | 4 | 3 | C | 7 |

The estimate becomes $(6+5+3+4+7)/5=5$ years. Seven years assumes three previous years **plus four additional expected years**. If the nominal four years describe total life, this addition would be wrong. The seven-year total has not yet been observed.

## Historical single-score proposal

### Purpose and status

A complementary score can make several indicators easier to communicate. The historical proposal below is a D4B presentation convention over selected indicators. It is neither complete EF coverage, an endpoint damage model nor proof of PEF compliance.

Its editorial groups are climate, ecosystems, environmental health and resources. They group midpoint indicators; they do not calculate those damage endpoints.

### Normalisation and weighting

The approach borrows the principle of EF normalisation and weighting:

$$
I_{norm_i}=\frac{I_i}{C_{norm_i}}
$$

$$
Score=\sum_i I_{norm_i}C_{weight_i}
$$

The adapted weights and groups below are **historical and not validated for the current version**. Establish their vintage and compatibility with the impact factors before use. Current simulators do not calculate an aggregate score.

| D4B editorial group | Midpoint indicator | Historical normalisation coefficient | Global weight | Within-group weight |
|---|---|---|---|---|
| Climate | Climate change | 8.10E+03 kg CO₂ eq. | 33.33% | 100.00% |
| Ecosystems | Acidification | 5.56E+01 mol H+ eq. | 9.81% | 76.35% |
| Ecosystems | Freshwater ecotoxicity | 4.27E+04 CTUe | 3.04% | 23.65% |
| Health | Human toxicity, non-cancer | 2.30E-04 CTUh | 2.91% | 10.26% |
| Health | Human toxicity, cancer | 1.69E-05 CTUh | 3.37% | 11.87% |
| Health | Particulate matter | 5.95E-04 disease occurrences | 14.18% | 49.94% |
| Health | Ionising radiation | 4.22E+03 kBq U-235 eq. | 7.93% | 27.93% |
| Resources | Water use | 1.15E+04 m³ eq., method to confirm | 13.47% | 52.99% |
| Resources | Mineral resource depletion | 6.36E-02 kg Sb eq. | 11.95% | 47.01% |

Numerator and denominator units and LCIA methods must match. The unresolved historical IR mass/activity inconsistency prevents direct use of unreconciled factors. Missing categories must not silently become zero. Rounded weights may not sum exactly to 100%.

### Display scale

A log-normal survival function can map a positive impact score to a relative display scale:

$$
\begin{aligned}
C(x)&=\frac12\left(1-\operatorname{erf}\left(\frac{\ln(x)-\mu}{\sqrt2\sigma}\right)\right)\\
\mu&=\ln(m)\\
\sigma&=\frac{|\ln(p_{10})-\mu|}{\sqrt2\times0.9061938024368232}
\end{aligned}
$$

Here $m$ is the median, $p_{10}$ the tenth percentile and $\operatorname{erf}$ the error function. The valid domain is $x>0$, $m>0$, $0<p_{10}<m$ and $\sigma>0$. The function equals 0.5 at the median and 0.9 at the tenth percentile; multiplication by 100 gives a 0–100 display.

Calibration must use a comparable, versioned population. Negative scores caused by credits, zero values and missing data need a separate convention: their logarithm or an arbitrary floor cannot be used without an explicit convention.

This transformation combines comparison against a reference population with a nonlinear display. A higher displayed value means a lower impact relative to that population, not an absolute sustainability threshold. Changing the benchmark can change the display without changing physical impacts.

[^context]: European Commission Environmental Footprint methods for the general normalisation/weighting principle; historical French D4B corpus for the adapted table and display proposal. The adapted proposal is not claimed to reproduce the official EF single score.


## Media generation profiles {#image-and-video-profile-formulas}

### Image and video profile formulas

The spatial profile reduces width and height by a latent-space factor of 8. For spatial patch size $p$, the image position count is:

$$
N=\left\lceil\frac{\lfloor w/8\rfloor}{p}\right\rceil
  \left\lceil\frac{\lfloor h/8\rfloor}{p}\right\rceil
$$

For $k$ images, $S$ steps, $L$ layers and hidden dimension $d$, the implemented DiT/hybrid proxy is:

$$
F=F_p+kS(2PN+4LN^2d)
$$

The attention term is explicit. This remains a graph approximation, not a universal equation validated by DiT[^ai-source-2]. U-Net profiles use $F=F_p+kS\,2P\lfloor w/8\rfloor\lfloor h/8\rfloor$; this proxy does not represent every convolution or VAE decoding operation.

For video, $k$ means frames, not videos. A profile may round this count to a block of $b$ frames: $k'=\lceil k/b\rceil b$. With temporal compression $c$, position count becomes:

$$
N_v=\left(\left\lfloor\frac{k'-1}{c}\right\rfloor+1\right)N
$$

The DiT/hybrid proxy then uses $F=F_p+S(2PN_v+4LN_v^2d)$. The U-Net profile multiplies spatial cost by $k'$. At equal duration, frame rate and resolution therefore change workload. Calibration depends on the selected architecture, steps and execution engine.

### Audio profile formulas

Duration $t$ in seconds and sample rate $f_s$ give $N_a=\lceil t f_s/c_t\rceil$ latent positions, with $c_t$ the profile's temporal reduction.

- Autoregressive profile: $F=F_p+2PN_aq$, with $q$ the proxy's codebook count.
- Diffusion profile: $F=F_p+S(2PN_a+4LN_a^2d)$, using profile steps and dimensions.

The codebook multiplier does not necessarily represent sequential or parallel execution. MusicGen requires specific calibration. MusicGen[^ai-ref-1] and Stable Audio Open[^ai-ref-2] document architectures, not these simulations' emissions. Codecs, decoding and output processing are not individually modeled.

[^ai-ref-2]: [Stability AI, Stable Audio Open, 2024](https://arxiv.org/abs/2407.14358).

[^ai-source-2]: Media: [Peebles et Xie, Scalable Diffusion Models with Transformers, 2022](https://arxiv.org/abs/2212.09748), [Clockwork Diffusion, 2023](https://arxiv.org/abs/2312.08128), [Meta, Simple and Controllable Music Generation, 2023](https://arxiv.org/abs/2306.05284), [Stability AI, Stable Audio Open, 2024](https://arxiv.org/abs/2407.14358).

[^ai-ref-1]: [Meta, Simple and Controllable Music Generation, 2023](https://arxiv.org/abs/2306.05284).

## Media analysis profiles {#visual-and-audio-input-calculations}

### Visual and audio input calculations

**Images and video.** The profile follows the Qwen2.5-VL configuration[^ai-ref-3]: 14-pixel patches, 2 × 2 spatial merging, temporal pairs for video, and 32 encoder layers including four with global attention. Processed dimensions are rounded up to a multiple of 28; a still image is repeated to supply the expected temporal pair. The Qwen2.5-VL report[^ai-ref-4] describes these mechanisms.

With $N=(w/14)(h/14)$ patches per processed image and $U$ independent images or video pairs, the language model receives $T_m=UN/4$ positions. The proxy counts patch projections, encoder linear projections, global or window attention, and merging. A multiply-add counts as two FLOPs.

$$
F=F_{encoder}+2P_{lang}(T_{in,effective}+T_m+T_{out})
$$

The language core uses approximately 7.61 billion parameters, separately from the encoder. Prefix caching reduces **text instructions only**: media encoding and positions remain counted. Long-context language-model attention, normalization and nonlinear operations are not detailed in this proxy.

**Audio.** The Whisper base configuration[^ai-ref-5] specifies six encoder and six decoder layers of width 512. Whisper preprocessing[^ai-ref-6] uses 30-second windows. The scenario assumes $C=\lceil t/30\rceil$ padded chunks, each with 1,500 positions after convolution; zero duration gives zero chunks.

The calculation counts input convolutions, the encoder, cross-attention and autoregressive decoding with KV caching. Total transcript tokens are distributed evenly across chunks; more than 448 tokens per chunk flags the scenario as out of bounds. Decoding follows a single text hypothesis: beam search, retries, silence detection and dynamic segmentation are excluded.

Audio chunking can produce cost steps: 10 and 30 seconds fill the same chunk in this scenario. Actual costs depend on the engine, padding and segmentation. These operation counts require MFU and power calibration; they are not Qwen or Whisper benchmarks.

[^ai-ref-3]: [Qwen2.5-VL configuration](https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct/blob/cc594898137f460bfe9f0759e9844b3ce807cfb5/config.json).

[^ai-ref-5]: [Whisper base configuration](https://huggingface.co/openai/whisper-base/blob/e37978b90ca9030d5170a5c07aadb050351a65bb/config.json).

[^ai-ref-4]: [Qwen, Qwen2.5-VL Technical Report, 2025](https://arxiv.org/abs/2502.13923).

[^ai-ref-6]: [Whisper preprocessing](https://github.com/openai/whisper/blob/main/whisper/audio.py).
