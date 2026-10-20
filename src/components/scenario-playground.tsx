import React, { useId, useState } from "react";
import { useLayoutDoc } from "@docusaurus/plugin-content-docs/client";
import {
  FIELDS,
  TITLES,
  defaults,
  initialInventory,
  evaluateScenario,
  terminalFactors,
  type ScenarioKind,
  type Locale,
  type Values,
  type Equipment,
  type Label,
} from "../scenarios";
import electricity from "../data/electricity-factors.json";
import profiles from "../terminal-profiles";

export function ScenarioPlayground({
  kind,
  lang = "fr",
}: {
  kind: ScenarioKind;
  lang?: string;
}) {
  const equipmentDoc = useLayoutDoc("modelisation/modelisation-d-un-equipement");
  const locale: Locale = lang.startsWith("en") ? "en" : "fr",
    fr = locale === "fr",
    id = useId();
  const t = (label: readonly string[]) => label[fr ? 0 : 1];
  const [values, setValues] = useState<Values>(() => defaults(kind));
  const [inventory, setInventory] = useState<Equipment[]>(() =>
    initialInventory(kind, locale),
  );
  const [userCountry, setUserCountry] = useState("FR");
  const [siteCountry, setSiteCountry] = useState(
    kind === "cloud" ? "IE" : "FR",
  );
  const defaultProfile =
    kind === "mobile" ? "smartphone" : kind === "web" ? "mixed" : "laptop";
  const [profile, setProfile] = useState(defaultProfile);
  const [mobileShare, setMobileShare] = useState(50);
  const serviceKind = ["web", "mail", "mobile"].includes(kind);
  const factors = serviceKind
    ? terminalFactors(profile, mobileShare)
    : undefined;
  const result = evaluateScenario(
    kind,
    values,
    inventory,
    electricity.countries[userCountry].gwp,
    electricity.countries[siteCountry].gwp,
    factors,
  );
  const number = (n: number) =>
    new Intl.NumberFormat(locale, { maximumSignificantDigits: 4 }).format(n);
  const parse = (raw: string) =>
    raw.trim() === "" ? null : Number(raw.replace(",", "."));
  const unit = (value: string) => {
    const [french, english] = value.split(" / ");
    return fr ? french : (english ?? french.replace(/Go/g, "GB").replace(/mois/g, "month"));
  };
  const visibleFields = FIELDS[kind].filter(
    (f) =>
      !(
        serviceKind &&
        profile !== "custom" &&
        ["deviceW", "deviceKg", "life"].includes(f.key)
      ),
  );
  const inputField = (field: (typeof FIELDS.fleet)[number]) => (
    <label
      key={field.key}
      htmlFor={`${id}-${field.key}`}
      className="scenario-field"
    >
      <span>
        {t(field.label)}
        {field.unit ? ` (${unit(field.unit)})` : ""}
      </span>
      <input
        id={`${id}-${field.key}`}
        type="number"
        step="any"
        min={field.min}
        max={field.max}
        value={values[field.key] ?? ""}
        placeholder={fr ? "Non évalué" : "Not assessed"}
        aria-invalid={result.errors.includes(field.key)}
        onChange={(e) =>
          setValues({ ...values, [field.key]: parse(e.target.value) })
        }
      />
    </label>
  );
  const countrySelect = (type: "user" | "site") => (
    <label className="scenario-field">
      <span>
        {type === "user"
          ? fr
            ? "Pays des utilisateurs"
            : "User country"
          : fr
            ? "Pays d’hébergement"
            : "Hosting country"}
      </span>
      <select
        value={type === "user" ? userCountry : siteCountry}
        onChange={(e) =>
          type === "user"
            ? setUserCountry(e.target.value)
            : setSiteCountry(e.target.value)
        }
      >
        {Object.keys(electricity.countries).map((country) => (
          <option key={country} value={country}>
            {new Intl.DisplayNames([locale], { type: "region" }).of(country)}
          </option>
        ))}
      </select>
    </label>
  );
  const inventoryOptions = initialInventory(kind, locale);
  const updateRow = (i: number, patch: Partial<Equipment>) =>
    setInventory(
      inventory.map((row, j) => (j === i ? { ...row, ...patch } : row)),
    );
  return (
    <>
      <section
        className="scenario"
        aria-label={`${fr ? "Simulateur" : "Simulator"} ${t(TITLES[kind])}`}
      >
        <div className="scenario-heading">
          <strong>{fr ? "Paramètres de l’exemple" : "Example inputs"}</strong>
          <button
            className="scenario-quiet"
            type="button"
            onClick={() => {
              setValues(defaults(kind));
              setInventory(initialInventory(kind, locale));
              setProfile(defaultProfile);
              setMobileShare(50);
              setUserCountry("FR");
              setSiteCountry(kind === "cloud" ? "IE" : "FR");
            }}
          >
            {fr ? "Réinitialiser" : "Reset"}
          </button>
        </div>
        <div className="scenario-fields">
          {visibleFields.filter((f) => !f.advanced).map(inputField)}
          {serviceKind && (
            <label className="scenario-field">
              <span>{kind === "mobile"
                ? (fr ? "Terminal de l’application" : "Application device")
                : (fr ? "Terminal des utilisateurs" : "User device")}</span>
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value)}
              >
                <option value="mixed">
                  {fr
                    ? "Répartition mobile / ordinateur"
                    : "Mobile / computer mix"}
                </option>
                {Object.entries(profiles.profiles).map(([key, value]) => (
                  <option value={key} key={key}>
                    {t(value.label)}
                  </option>
                ))}
                <option value="custom">
                  {fr ? "Paramètres personnalisés" : "Custom parameters"}
                </option>
              </select>
            </label>
          )}
          {serviceKind && profile === "mixed" && (
            <label className="scenario-field" htmlFor={`${id}-mobile-share`}>
              <span>
                {fr
                  ? "Répartition du temps : mobile / ordinateur"
                  : "Usage time split: mobile / computer"}
              </span>
              <input
                id={`${id}-mobile-share`}
                aria-label={fr ? "Répartition du temps : mobile / ordinateur" : "Usage time split: mobile / computer"}
                aria-valuetext={fr
                  ? `Mobile ${mobileShare} %, ordinateur ${100 - mobileShare} %`
                  : `Mobile ${mobileShare}%, computer ${100 - mobileShare}%`}
                type="range"
                min="0"
                max="100"
                step="1"
                value={mobileShare}
                onChange={(e) => setMobileShare(Number(e.target.value))}
              />
              <output className="scenario-device-share" htmlFor={`${id}-mobile-share`}>
                {fr
                  ? `Mobile ${mobileShare} % · Ordinateur ${100 - mobileShare} %`
                  : `Mobile ${mobileShare}% · Computer ${100 - mobileShare}%`}
              </output>
            </label>
          )}
          {kind !== "cloud" && kind !== "hosting" && countrySelect("user")}
          {kind !== "fleet" && countrySelect("site")}
        </div>
        {(kind === "fleet" || kind === "hosting") && (
          <div className="scenario-inventory">
            {inventory.map((row, i) => (
              <div className="inventory-row" key={i}>
                <div className="scenario-fields">
                  <label className="scenario-field">
                    <span>{fr ? "Type d’équipement" : "Equipment type"}</span>
                    <select
                      value={row.name}
                      onChange={(e) => {
                        const selected = inventoryOptions.find(
                          (r) => r.name === e.target.value,
                        );
                        if (selected)
                          updateRow(i, { ...selected, quantity: row.quantity });
                      }}
                    >
                      {inventoryOptions.map((option) => (
                        <option key={option.name}>{option.name}</option>
                      ))}
                    </select>
                  </label>
                  <label className="scenario-field">
                    <span>{fr ? "Nombre" : "Count"}</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={Number.isNaN(row.quantity) ? "" : row.quantity}
                      onChange={(e) =>
                        updateRow(i, { quantity: parse(e.target.value) ?? NaN })
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="scenario-quiet"
                    aria-label={`${fr ? "Retirer" : "Remove"} ${row.name}`}
                    onClick={() =>
                      setInventory(inventory.filter((_, j) => j !== i))
                    }
                  >
                    {fr ? "Retirer" : "Remove"}
                  </button>
                </div>
                <details>
                  <summary>
                    {fr ? "Facteurs de l’équipement" : "Equipment factors"}
                  </summary>
                  <div className="scenario-fields">
                    {(["embodied", "life", "energy"] as const).map((key, j) => (
                      <label className="scenario-field" key={key}>
                        <span>
                          {
                            (fr
                              ? [
                                  "Fabrication (kg CO₂e/unité)",
                                  "Durée de vie (ans)",
                                  "Énergie (kWh/unité/an)",
                                ]
                              : [
                                  "Manufacture (kg CO₂e/device)",
                                  "Lifetime (years)",
                                  "Energy (kWh/device/year)",
                                ])[j]
                          }
                        </span>
                        <input
                          type="number"
                          min={key === "life" ? 0.1 : 0}
                          step="any"
                          value={Number.isNaN(row[key]) ? "" : row[key]}
                          onChange={(e) =>
                            updateRow(i, {
                              [key]: parse(e.target.value) ?? NaN,
                            })
                          }
                        />
                      </label>
                    ))}
                  </div>
                </details>
              </div>
            ))}
            <button
              type="button"
              className="scenario-quiet"
              onClick={() =>
                setInventory([
                  ...inventory,
                  { ...inventoryOptions[0], quantity: 1 },
                ])
              }
            >
              {fr ? "Ajouter un équipement" : "Add equipment"}
            </button>
          </div>
        )}
        <details className="scenario-advanced">
          <summary>
            {fr ? "Ajuster les hypothèses" : "Adjust assumptions"}
          </summary>
          <div className="scenario-fields">
            {visibleFields.filter((f) => f.advanced).map(inputField)}
          </div>
        </details>
        {result.errors.length > 0 ? (
          <p role="alert">
            {fr
              ? "Certaines valeurs sont manquantes ou hors limites."
              : "Some values are missing or out of range."}
          </p>
        ) : (
          <>
            <div className="scenario-result" aria-live="polite">
              <div>
                <span>{fr ? "Sous-total calculé" : "Calculated subtotal"}</span>
                <strong>{number(result.subtotal)} kg CO₂e</strong>
              </div>
              {result.functionalCount > 0 && (
                <span>
                  {number(result.subtotal / result.functionalCount)} kg CO₂e /{" "}
                  {t(result.unit)}
                </span>
              )}
            </div>
            <p className="scenario-coverage">
              {fr ? "Non évalué : " : "Not assessed: "}
              {result.missing.map(t).join(" ; ")}.
            </p>
            <section className="scenario-breakdown">
              <h3>
                {fr
                  ? "Détail des résultats et quantités"
                  : "Result and activity breakdown"}
              </h3>
              <div className="scenario-table">
                <table>
                  <thead>
                    <tr>
                      <th>{fr ? "Poste" : "Contribution"}</th>
                      <th>kg CO₂e</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.contributions.map((row, i) => (
                      <tr key={i}>
                        <td>
                          {t(row.label)}
                          {row.kwh !== undefined && (
                            <small> · {number(row.kwh)} kWh</small>
                          )}
                        </td>
                        <td>
                          {row.kg === null
                            ? fr
                              ? "Non évalué"
                              : "Not assessed"
                            : number(row.kg)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul>
                {result.activities.map((row, i) => (
                  <li key={i}>
                    {t(row.label)} : {number(row.value)} {unit(row.unit)}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </section>
      <p className="simulator-context">
        {fr
          ? "Les activités et l’hébergement préremplis sont des hypothèses d’exemple. Le résultat couvre le climat ; les postes non évalués restent signalés."
          : "Prefilled activity and hosting values are example assumptions. The result covers climate impact; unassessed contributions remain identified."}
      </p>
      <section className="simulator-method">
        <h3>
          {fr
            ? "Facteurs utilisés et conventions du simulateur"
            : "Simulator factors and conventions"}
        </h3>
        <p>
          <a href={electricity.source}>
            {fr
              ? "Électricité : moyennes nationales D4B 2025"
              : "Electricity: D4B 2025 national averages"}
          </a>
          .{" "}
          {fr
            ? "Le pays d’usage ne modifie pas la fabrication. Les facteurs réseau restent inconnus tant qu’ils ne sont pas renseignés ; ils doivent couvrir le trajet complet, fabrication et usage inclus. Dans cette illustration, la distance du modèle D4B par Go·km est intégrée en amont dans le facteur de trajet par Go."
            : "Use country does not change manufacture. Network factors remain unknown until supplied; they must cover the full path, manufacture and operation included. In this illustration, the distance from the D4B per-GB·km model is incorporated upstream into the per-GB route factor."}
        </p>
        {serviceKind && (
          <>
            <p>
              <a href={equipmentDoc?.path}>
                {fr
                  ? "Terminaux : configurations paramétriques illustratives"
                  : "Devices: illustrative parametric configurations"}
              </a>
              .{" "}
              {fr
                ? "Les profils sont calculés par composants et incluent leur écran. Les groupes ordinateur et mobile utilisent respectivement 60 % de portables et 95 % de smartphones, pondérés par le temps actif. Ce sont des compositions fictives, pas des moyennes mesurées. Le facteur de fabrication par seconde est déjà alloué sur la durée de vie."
                : "Profiles are calculated from components and include their display. Computer and mobile groups assume 60% laptops and 95% smartphones, weighted by active time. These are fictional compositions, not measured averages. Manufacturing per second is already allocated over lifetime."}
            </p>
            {factors && (
              <p>
                {fr ? "Profil courant" : "Current profile"} :{" "}
                {number(factors.power)} W · {number(factors.embodied * 3600)} kg
                CO₂e/h {fr ? "de fabrication allouée" : "allocated manufacture"}
                .
              </p>
            )}
            <p>
              {fr
                ? "La fabrication est répartie sur la durée de vie calendaire (8 760 h/an). Le mode personnalisé remplace le profil calculé ; il ne s’y ajoute pas."
                : "Manufacturing is allocated over calendar lifetime (8,760 h/year). Custom inputs replace the calculated profile; they are not added to it."}
            </p>
          </>
        )}
        {(kind === "fleet" || kind === "hosting") && (
          <p>
            {fr
              ? "Énergie annuelle par équipement, tous états inclus. Pour l’hébergement, saisir l’énergie IT avant PUE. Les profils d’inventaire préremplis sont les hypothèses de l’exemple de cette page."
              : "Annual energy per device, all power states included. For hosting, enter IT energy before PUE. Prefilled inventory profiles are assumptions from this page’s worked example."}
          </p>
        )}
        {kind === "mail" && (
          <p>
            {fr
              ? "Le facteur de stockage couvre les copies et la durée indiquées. L’hébergement doit exclure ce stockage pour éviter un double comptage."
              : "The storage factor covers the specified copies and duration. Hosting must exclude that same storage to avoid double counting."}
          </p>
        )}
        {kind === "cloud" && (
          <p>
            <a href="https://www.cloudcarbonfootprint.org/docs/methodology/">
              Cloud Carbon Footprint
            </a>{" "}
            :{" "}
            {fr
              ? "conversion des activités. Les coefficients préremplis sont des hypothèses historiques modifiables, pas des mesures du fournisseur étudié."
              : "activity conversion. Prefilled coefficients are editable historical assumptions, not measurements of the provider being assessed."}
          </p>
        )}
      </section>
    </>
  );
}
