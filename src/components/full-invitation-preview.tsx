import React from "react";
import { MapPin, Image as ImageIcon, Gift, Calendar, Heart, Send, Check } from "lucide-react";
import { PreviewInvitation, ThemeOverrides } from "./preview-invitation";
import { Template } from "@/lib/templates";
import { getPalette, getFontClass } from "./preview-invitation";
import { InlineTextEditor } from "./inline-editor";

interface FullInvitationPreviewProps {
  template: Template;
  coverImageUrl: string | null;
  coverImageUrl2: string | null;
  title: string;
  hostName: string;
  eventDate: string;
  message: string;
  themeOverrides: ThemeOverrides;
  musicUrl: string | null;
  program: any[];
  location: string;
  venueImageUrl: string | null;
  galleryUrls: string[];
  giftInfo: string;
  dressCode?: string | null;
  accommodationInfo?: string | null;
  scrollAnimation: string;
  isBuilder?: boolean;
  onThemeUpdate?: (updates: any) => void;
  onImageUpdate?: (key: string, file: File) => void;
}

export function FullInvitationPreview({
  template,
  coverImageUrl,
  coverImageUrl2,
  title,
  hostName,
  eventDate,
  message,
  themeOverrides,
  musicUrl,
  program,
  location,
  venueImageUrl,
  galleryUrls,
  giftInfo,
  dressCode,
  accommodationInfo,
  scrollAnimation,
  isBuilder,
  onThemeUpdate,
  onImageUpdate,
}: FullInvitationPreviewProps) {
  const dark = !!template.dark;
  const palette = getPalette(template, themeOverrides);

  const pageThemeStyle: React.CSSProperties = {
    ["--ivory" as any]: palette.bg,
    ["--background" as any]: palette.bg,
    ["--foreground" as any]: palette.text,
    ["--muted-foreground" as any]: palette.sub,
    ["--accent" as any]: palette.accent,
    ["--primary" as any]: palette.accent,
    ["--primary-foreground" as any]: palette.bg,
    ["--card" as any]: dark
      ? `color-mix(in oklab, ${palette.bg} 78%, white)`
      : `color-mix(in oklab, ${palette.bg} 70%, white)`,
    ["--border" as any]: palette.rule,
    background: palette.bg,
    color: palette.text,
  };

  return (
    <div
      id="full-invitation-root"
      className="w-full relative pb-32 overflow-x-hidden min-h-screen origin-top shadow-xl"
      style={pageThemeStyle}
    >
      <style>{`
        ${themeOverrides?.bg ? `#full-invitation-root { background-color: ${themeOverrides.bg} !important; }` : ''}
        ${(themeOverrides?.textColor || themeOverrides?.text) ? `
          #full-invitation-root,
          #full-invitation-root p:not([data-inv-ceremony]):not([data-inv-date]):not([data-inv-title]),
          #full-invitation-root div.text-sm,
          #full-invitation-root div.text-base,
          #full-invitation-root span:not([data-inv-ceremony]):not([data-inv-title]):not([data-inv-date]) {
            color: ${themeOverrides.textColor || themeOverrides.text} !important;
          }
        ` : ''}
        ${themeOverrides?.fontSizeBody ? `
          #full-invitation-root p:not([data-inv-ceremony]):not([data-inv-date]):not([data-inv-title]),
          #full-invitation-root .text-sm,
          #full-invitation-root .text-base {
            font-size: ${themeOverrides.fontSizeBody}px !important;
          }
        ` : ''}
        
        ${(themeOverrides?.extraSectionColor || themeOverrides?.accent) ? `
          #full-invitation-root section h2,
          #full-invitation-root section h2 span,
          #full-invitation-root section h2 * {
            color: ${themeOverrides.extraSectionColor || themeOverrides.accent} !important;
          }
        ` : ''}
        ${(themeOverrides?.fontSizeExtraSection || themeOverrides?.fontSizeSubtitle) ? `
          #full-invitation-root section h2,
          #full-invitation-root section h2 span,
          #full-invitation-root section h2 * {
            font-size: ${themeOverrides.fontSizeExtraSection || themeOverrides.fontSizeSubtitle}px !important;
          }
        ` : ''}

        ${themeOverrides?.titleColor ? `#full-invitation-root h1, #full-invitation-root h2[data-inv-title], #generative-preview h1, #generative-preview h2 { color: ${themeOverrides.titleColor} !important; }` : ''}
        ${themeOverrides?.fontSizeTitle ? `#full-invitation-root h1, #full-invitation-root h2[data-inv-title], #generative-preview h1, #generative-preview h2 { font-size: ${themeOverrides.fontSizeTitle}px !important; }` : ''}
        
        ${(themeOverrides?.ceremonyColor || themeOverrides?.accent) ? `#full-invitation-root [data-inv-ceremony] { color: ${themeOverrides.ceremonyColor || themeOverrides.accent} !important; }` : ''}
        ${(themeOverrides?.fontSizeLabel || themeOverrides?.fontSizeExtraSection) ? `#full-invitation-root [data-inv-ceremony] { font-size: ${themeOverrides.fontSizeLabel || themeOverrides.fontSizeExtraSection}px !important; }` : ''}
        
        ${themeOverrides?.subtitleColor ? `#full-invitation-root [data-inv-subtitle] { color: ${themeOverrides.subtitleColor} !important; }` : ''}
        ${themeOverrides?.fontSizeSubtitle ? `#full-invitation-root [data-inv-subtitle] { font-size: ${themeOverrides.fontSizeSubtitle}px !important; }` : ''}

        ${themeOverrides?.dateColor ? `#full-invitation-root [data-inv-date] { color: ${themeOverrides.dateColor} !important; }` : ''}
        ${themeOverrides?.fontSizeDate ? `#full-invitation-root [data-inv-date] { font-size: ${themeOverrides.fontSizeDate}px !important; }` : ''}

        ${themeOverrides?.messageColor ? `#full-invitation-root [data-inv-message] { color: ${themeOverrides.messageColor} !important; }` : ''}
        ${themeOverrides?.fontSizeMessage ? `#full-invitation-root [data-inv-message] { font-size: ${themeOverrides.fontSizeMessage}px !important; }` : ''}

        ${themeOverrides?.allBold ? `#full-invitation-root * { font-weight: 700 !important; }` : ''}
        ${themeOverrides?.fontWeightAll ? `#full-invitation-root * { font-weight: ${themeOverrides.fontWeightAll} !important; }` : ''}

        /* 1. Conteneur principal du héros : transparent et sans boîte de carte opaque */
        #full-invitation-root section:first-of-type > div > div > div:first-child,
        #full-invitation-root [id="generative-preview"] > div:first-child,
        #full-invitation-root [id="generative-preview"] [class*="min-h-[85vh]"],
        #full-invitation-root .polaroid-preview > div:first-child,
        #full-invitation-root .illustrated-preview > div:first-child {
          background: transparent !important;
          background-color: transparent !important;
          box-shadow: none !important;
          border: none !important;
        }

        #full-invitation-root [class*="bg-pink-100"],
        #full-invitation-root [class*="bg-blue-100"],
        #full-invitation-root [class*="blur-3xl"],
        #full-invitation-root [class*="blur-[80px]"] {
          display: none !important;
        }
      `}</style>
      <section className="relative w-full min-h-screen flex items-center justify-center pt-4">
        <div className="w-full max-w-sm md:max-w-md">
          <PreviewInvitation
            template={template}
            coverImageUrl={coverImageUrl}
            coverImageUrl2={coverImageUrl2}
            title={title}
            hostName={hostName}
            eventDate={eventDate}
            message={message}
            themeOverrides={themeOverrides}
            musicUrl={musicUrl}
            isBuilder={isBuilder}
            onThemeUpdate={onThemeUpdate}
            onImageUpdate={onImageUpdate}
          />
        </div>
      </section>

      {/* PROGRAMME */}
      {program && program.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif italic text-3xl md:text-4xl mb-8" style={{ color: palette.accent }}>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="ProgramTitle"
                  textKey="textProgramme"
                  textLabel="Titre de la section programme"
                  currentText={themeOverrides?.textProgramme ?? "Le Programme"}
                  currentFontSize={themeOverrides?.fontSizeProgramTitle ?? null}
                  currentColor={themeOverrides?.programTitleColor || palette.accent}
                  currentFont={themeOverrides?.fontProgramTitle ?? null}
                  currentBgColor={themeOverrides?.bgProgramTitle ?? null}
                  onUpdate={onThemeUpdate!}
                >
                  <span className={`${getFontClass(themeOverrides?.fontProgramTitle, '')} rounded px-2`} style={{ color: themeOverrides?.programTitleColor || palette.accent, backgroundColor: themeOverrides?.bgProgramTitle || undefined }}>
                    {themeOverrides?.textProgramme || "Le Programme"}
                  </span>
                </InlineTextEditor>
              </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5" style={{ '--tw-gradient-via': palette.accent + '33' } as any}>
              <div className="absolute inset-y-0 left-5 md:left-1/2 w-0.5 bg-gradient-to-b from-transparent via-[var(--tw-gradient-via)] to-transparent" />
              {program.map((item, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 shadow-sm md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 z-10 shrink-0" style={{ background: `color-mix(in oklab, ${palette.bg} 70%, white)`, borderColor: palette.bg, color: palette.accent }}>
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border shadow-sm" style={{ background: `color-mix(in oklab, ${palette.bg} 70%, white)`, borderColor: palette.rule }}>
                    <div className="font-display mb-1" style={{ color: palette.accent }}>{item.time}</div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm" style={{ color: palette.sub }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LIEU & ACCÈS */}
      {(location || venueImageUrl) && (
        <section className="py-12 px-6">
          <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif italic text-3xl md:text-4xl mb-8" style={{ color: palette.accent }}>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="LocationTitle"
                  textKey="textLieu"
                  textLabel="Titre de la section lieu"
                  currentText={themeOverrides?.textLieu ?? "Lieu & Accès"}
                  currentFontSize={themeOverrides?.fontSizeLocationTitle ?? null}
                  currentColor={themeOverrides?.locationTitleColor || palette.accent}
                  currentFont={themeOverrides?.fontLocationTitle ?? null}
                  currentBgColor={themeOverrides?.bgLocationTitle ?? null}
                  onUpdate={onThemeUpdate!}
                >
                  <span className={`${getFontClass(themeOverrides?.fontLocationTitle, '')} rounded px-2`} style={{ color: themeOverrides?.locationTitleColor || palette.accent, backgroundColor: themeOverrides?.bgLocationTitle || undefined }}>
                    {themeOverrides?.textLieu || "Lieu & Accès"}
                  </span>
                </InlineTextEditor>
              </h2>
            <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ background: `color-mix(in oklab, ${palette.bg} 70%, white)`, borderColor: palette.rule }}>
              {venueImageUrl && (
                <div className="w-full h-48 md:h-64 overflow-hidden relative">
                  <img src={venueImageUrl} alt="Lieu" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-6 md:p-8">
                <MapPin className="w-8 h-8 mx-auto mb-4" style={{ color: palette.accent }} />
                  <InlineTextEditor
                    isBuilder={isBuilder}
                    themeKey="LocationText"
                    currentFontSize={themeOverrides?.fontSizeLocationText ?? null}
                    currentColor={themeOverrides?.locationTextColor || palette.text}
                    currentFont={themeOverrides?.fontLocationText ?? null}
                    currentBgColor={themeOverrides?.bgLocationText ?? null}
                    onUpdate={onThemeUpdate!}
                  >
                    <p className={`${getFontClass(themeOverrides?.fontLocationText, '')} font-medium whitespace-pre-line text-lg mb-4 rounded px-2`} style={{ color: themeOverrides?.locationTextColor || palette.text, backgroundColor: themeOverrides?.bgLocationText || undefined }}>{location}</p>
                  </InlineTextEditor>
                <div className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-medium opacity-50 cursor-not-allowed" style={{ background: palette.accent, color: dark ? palette.bg : '#fff' }}>
                  Itinéraire
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DRESS CODE */}
      {(() => {
        if (!dressCode && !isBuilder) return null;
        const cardTitle = themeOverrides?.textDressCode || "Dress code";
        const cardColorKey = "dressCodeTitleColor";
        const cardColor = (themeOverrides as any)?.[cardColorKey] || palette.accent;
        const cardFontSize = themeOverrides?.fontSizeDressCodeTitle || null;
        const cardFont = themeOverrides?.fontDressCodeTitle || null;
        const cardBg = themeOverrides?.bgDressCodeTitle || null;
        const textVal = dressCode || "Tenue de soirée, chic & élégante";

        return (
          <section className="py-12 px-6">
            <div className="max-w-xl mx-auto text-center mb-8">
              <InlineTextEditor
                isBuilder={isBuilder}
                themeKey="DressCodeHeader"
                textKey="textDressCodeHeader"
                textLabel="Surtitre (ex: Tenue souhaitée)"
                currentText={themeOverrides?.textDressCodeHeader ?? "Tenue souhaitée"}
                currentFontSize={themeOverrides?.fontSizeDressCodeHeader ?? null}
                currentColor={themeOverrides?.dressCodeHeaderColor || palette.accent}
                currentFont={themeOverrides?.fontDressCodeHeader ?? null}
                currentBgColor={themeOverrides?.bgDressCodeHeader ?? null}
                onUpdate={onThemeUpdate!}
              >
                <p
                  className={`${getFontClass(themeOverrides?.fontDressCodeHeader, '')} uppercase tracking-[0.25em] text-xs font-semibold mb-2 rounded px-1 inline-block`}
                  style={{
                    color: themeOverrides?.dressCodeHeaderColor || palette.accent,
                    backgroundColor: themeOverrides?.bgDressCodeHeader || undefined,
                    fontSize: themeOverrides?.fontSizeDressCodeHeader ? `${themeOverrides.fontSizeDressCodeHeader}px` : undefined,
                  }}
                >
                  {themeOverrides?.textDressCodeHeader || "Tenue souhaitée"}
                </p>
              </InlineTextEditor>
              <h2
                className="font-serif italic text-3xl md:text-4xl"
                style={{ color: themeOverrides?.dressCodeSectionTitleColor || themeOverrides?.extraSectionColor || palette.accent }}
              >
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="DressCodeSectionTitle"
                  textKey="textDressCodeSectionTitle"
                  textLabel="Titre de la section"
                  currentText={themeOverrides?.textDressCodeSectionTitle ?? "Dress code"}
                  currentFontSize={themeOverrides?.fontSizeDressCodeSectionTitle || themeOverrides?.fontSizeSubtitle || null}
                  currentColor={themeOverrides?.dressCodeSectionTitleColor || palette.accent}
                  currentFont={themeOverrides?.fontDressCodeSectionTitle || themeOverrides?.fontExtraSection || null}
                  currentBgColor={themeOverrides?.bgDressCodeSectionTitle || null}
                  onUpdate={onThemeUpdate!}
                >
                  <span
                    className={`${getFontClass(themeOverrides?.fontDressCodeSectionTitle || themeOverrides?.fontExtraSection, '')} rounded px-2`}
                    style={{
                      color: themeOverrides?.dressCodeSectionTitleColor || palette.accent,
                      backgroundColor: themeOverrides?.bgDressCodeSectionTitle || undefined,
                      fontSize: (themeOverrides?.fontSizeDressCodeSectionTitle || themeOverrides?.fontSizeSubtitle) ? `${themeOverrides?.fontSizeDressCodeSectionTitle || themeOverrides?.fontSizeSubtitle}px` : undefined,
                    }}
                  >
                    {themeOverrides?.textDressCodeSectionTitle || "Dress code"}
                  </span>
                </InlineTextEditor>
              </h2>
            </div>

            <div className="max-w-xl mx-auto">
              <div
                className="rounded-2xl p-4 md:p-5 border shadow-sm flex items-start gap-4 text-left transition-all"
                style={{
                  background: `color-mix(in oklab, ${palette.bg} 70%, white)`,
                  borderColor: palette.rule,
                }}
              >
                <div
                  className="text-2xl md:text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ background: palette.bg + "44" }}
                >
                  👗
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3
                    className="font-bold text-base mb-1"
                    style={{ color: cardColor }}
                  >
                    <InlineTextEditor
                      isBuilder={isBuilder}
                      themeKey="DressCodeTitle"
                      textKey="textDressCode"
                      textLabel="Titre Dress code"
                      currentText={cardTitle}
                      currentFontSize={cardFontSize}
                      currentColor={cardColor}
                      currentFont={cardFont}
                      currentBgColor={cardBg}
                      onUpdate={onThemeUpdate!}
                    >
                      <span
                        className={`${getFontClass(cardFont, '')} rounded px-1`}
                        style={{
                          color: cardColor,
                          backgroundColor: cardBg || undefined,
                          fontSize: cardFontSize ? `${cardFontSize}px` : undefined,
                        }}
                      >
                        {cardTitle}
                      </span>
                    </InlineTextEditor>
                  </h3>
                  <p
                    className="text-xs md:text-sm leading-relaxed whitespace-pre-line"
                    style={{ color: palette.sub }}
                  >
                    {textVal}
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* GALERIE (ENTRE DRESS CODE ET CADEAUX) */}
      {galleryUrls && galleryUrls.length > 0 && (
        <section className="py-12 px-6">
          <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif italic text-3xl md:text-4xl mb-8" style={{ color: palette.accent }}>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="GalleryTitle"
                  textKey="textGalerie"
                  textLabel="Titre de la galerie"
                  currentText={themeOverrides?.textGalerie ?? "Galerie"}
                  currentFontSize={themeOverrides?.fontSizeGalleryTitle ?? null}
                  currentColor={themeOverrides?.galleryTitleColor || palette.accent}
                  currentFont={themeOverrides?.fontGalleryTitle ?? null}
                  currentBgColor={themeOverrides?.bgGalleryTitle ?? null}
                  onUpdate={onThemeUpdate!}
                >
                  <span className={`${getFontClass(themeOverrides?.fontGalleryTitle, '')} rounded px-2`} style={{ color: themeOverrides?.galleryTitleColor || palette.accent, backgroundColor: themeOverrides?.bgGalleryTitle || undefined }}>
                    {themeOverrides?.textGalerie || "Galerie"}
                  </span>
                </InlineTextEditor>
              </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {galleryUrls.map((url, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden relative">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CADEAUX & HÉBERGEMENT */}
      {(() => {
        const giftCards = [
          (giftInfo || (isBuilder && !giftInfo && !accommodationInfo))
            ? {
                key: "giftInfo",
                titleKey: "textCadeaux",
                themeKey: "GiftCardTitle",
                defaultTitle: "Cadeaux",
                icon: "🎁",
                text: giftInfo || "Votre présence est notre plus beau cadeau",
              }
            : giftInfo
              ? {
                  key: "giftInfo",
                  titleKey: "textCadeaux",
                  themeKey: "GiftCardTitle",
                  defaultTitle: "Cadeaux",
                  icon: "🎁",
                  text: giftInfo,
                }
              : null,
          (accommodationInfo || (isBuilder && !giftInfo && !accommodationInfo))
            ? {
                key: "accommodationInfo",
                titleKey: "textHebergement",
                themeKey: "AccommodationTitle",
                defaultTitle: "Hébergement",
                icon: "🏨",
                text: accommodationInfo || "Hôtels partenaires & recommandations",
              }
            : accommodationInfo
              ? {
                  key: "accommodationInfo",
                  titleKey: "textHebergement",
                  themeKey: "AccommodationTitle",
                  defaultTitle: "Hébergement",
                  icon: "🏨",
                  text: accommodationInfo,
                }
              : null,
        ].filter(Boolean) as {
          key: string;
          titleKey: string;
          themeKey: string;
          defaultTitle: string;
          icon: string;
          text: string;
        }[];

        if (giftCards.length === 0) return null;

        return (
          <section className="py-12 px-6">
            <div className="max-w-xl mx-auto text-center mb-8">
              <InlineTextEditor
                isBuilder={isBuilder}
                themeKey="BonASavoir"
                textKey="textBonASavoir"
                textLabel="Surtitre (ex: Bon à savoir)"
                currentText={themeOverrides?.textBonASavoir ?? "Bon à savoir"}
                currentFontSize={themeOverrides?.fontSizeBonASavoir ?? null}
                currentColor={themeOverrides?.bonASavoirColor || palette.accent}
                currentFont={themeOverrides?.fontBonASavoir ?? null}
                currentBgColor={themeOverrides?.bgBonASavoir ?? null}
                onUpdate={onThemeUpdate!}
              >
                <p
                  className={`${getFontClass(themeOverrides?.fontBonASavoir, '')} uppercase tracking-[0.25em] text-xs font-semibold mb-2 rounded px-1 inline-block`}
                  style={{
                    color: themeOverrides?.bonASavoirColor || palette.accent,
                    backgroundColor: themeOverrides?.bgBonASavoir || undefined,
                    fontSize: themeOverrides?.fontSizeBonASavoir ? `${themeOverrides.fontSizeBonASavoir}px` : undefined,
                  }}
                >
                  {themeOverrides?.textBonASavoir || "Bon à savoir"}
                </p>
              </InlineTextEditor>
              <h2
                className="font-serif italic text-3xl md:text-4xl"
                style={{ color: themeOverrides?.infosPratiquesTitleColor || themeOverrides?.extraSectionColor || palette.accent }}
              >
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="InfosPratiquesTitle"
                  textKey="textInfosPratiques"
                  textLabel="Titre de la section"
                  currentText={themeOverrides?.textInfosPratiques ?? "Cadeaux & Hébergement"}
                  currentFontSize={themeOverrides?.fontSizeInfosPratiquesTitle || themeOverrides?.fontSizeSubtitle || null}
                  currentColor={themeOverrides?.infosPratiquesTitleColor || themeOverrides?.extraSectionColor || palette.accent}
                  currentFont={themeOverrides?.fontInfosPratiquesTitle || themeOverrides?.fontExtraSection || null}
                  currentBgColor={themeOverrides?.bgInfosPratiquesTitle || themeOverrides?.bgExtraSection || null}
                  onUpdate={onThemeUpdate!}
                >
                  <span
                    className={`${getFontClass(themeOverrides?.fontInfosPratiquesTitle || themeOverrides?.fontExtraSection, '')} rounded px-2`}
                    style={{
                      color: themeOverrides?.infosPratiquesTitleColor || themeOverrides?.extraSectionColor || palette.accent,
                      backgroundColor: themeOverrides?.bgInfosPratiquesTitle || themeOverrides?.bgExtraSection || undefined,
                      fontSize: (themeOverrides?.fontSizeInfosPratiquesTitle || themeOverrides?.fontSizeSubtitle) ? `${themeOverrides?.fontSizeInfosPratiquesTitle || themeOverrides?.fontSizeSubtitle}px` : undefined,
                    }}
                  >
                    {themeOverrides?.textInfosPratiques || "Cadeaux & Hébergement"}
                  </span>
                </InlineTextEditor>
              </h2>
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              {giftCards.map((card, i) => {
                const cardTitle =
                  (themeOverrides as any)?.[card.titleKey] || card.defaultTitle;
                const cardColorKey =
                  card.themeKey.charAt(0).toLowerCase() + card.themeKey.slice(1) + "Color";
                const cardColor =
                  (themeOverrides as any)?.[cardColorKey] || palette.accent;
                const cardFontSizeKey = "fontSize" + card.themeKey;
                const cardFontSize = (themeOverrides as any)?.[cardFontSizeKey] || null;
                const cardFontKey = "font" + card.themeKey;
                const cardFont = (themeOverrides as any)?.[cardFontKey] || null;
                const cardBgKey = "bg" + card.themeKey;
                const cardBg = (themeOverrides as any)?.[cardBgKey] || null;

                return (
                  <div
                    key={i}
                    className="rounded-2xl p-4 md:p-5 border shadow-sm flex items-start gap-4 text-left transition-all"
                    style={{
                      background: `color-mix(in oklab, ${palette.bg} 70%, white)`,
                      borderColor: palette.rule,
                    }}
                  >
                    <div
                      className="text-2xl md:text-3xl shrink-0 w-12 h-12 flex items-center justify-center rounded-xl"
                      style={{ background: palette.bg + "44" }}
                    >
                      {card.icon}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <h3
                        className="font-bold text-base mb-1"
                        style={{ color: cardColor }}
                      >
                        <InlineTextEditor
                          isBuilder={isBuilder}
                          themeKey={card.themeKey}
                          textKey={card.titleKey}
                          textLabel={`Titre ${card.defaultTitle}`}
                          currentText={cardTitle}
                          currentFontSize={cardFontSize}
                          currentColor={cardColor}
                          currentFont={cardFont}
                          currentBgColor={cardBg}
                          onUpdate={onThemeUpdate!}
                        >
                          <span
                            className={`${getFontClass(cardFont, '')} rounded px-1`}
                            style={{
                              color: cardColor,
                              backgroundColor: cardBg || undefined,
                              fontSize: cardFontSize ? `${cardFontSize}px` : undefined,
                            }}
                          >
                            {cardTitle}
                          </span>
                        </InlineTextEditor>
                      </h3>
                      <p
                        className="text-xs md:text-sm leading-relaxed whitespace-pre-line"
                        style={{ color: palette.sub }}
                      >
                        {card.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })()}

      {/* RSVP */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-xl mx-auto">
          <div className="border shadow-sm rounded-3xl p-6 md:p-10 relative overflow-hidden" style={{ background: `color-mix(in oklab, ${palette.bg} 70%, white)`, borderColor: palette.rule }}>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Heart className="w-32 h-32" />
            </div>
            <div className="relative z-10">
                <h2 className="font-serif italic text-3xl md:text-4xl mb-4" style={{ color: palette.accent }}>
                  <InlineTextEditor
                      isBuilder={isBuilder}
                      themeKey="RsvpTitle"
                      textKey="textRsvpTitre"
                      textLabel="Titre du formulaire RSVP"
                      currentText={themeOverrides?.textRsvpTitre ?? "Confirmer ma présence"}
                      currentFontSize={themeOverrides?.fontSizeRsvpTitle ?? null}
                      currentColor={themeOverrides?.rsvpTitleColor || palette.accent}
                      currentFont={themeOverrides?.fontRsvpTitle ?? null}
                      currentBgColor={themeOverrides?.bgRsvpTitle ?? null}
                      currentHidden={themeOverrides?.hideRsvpTitle ?? false}
                      onUpdate={onThemeUpdate!}
                    >
                      <span className={`${getFontClass(themeOverrides?.fontRsvpTitle, '')} rounded px-2`} style={{ color: themeOverrides?.rsvpTitleColor || palette.accent, backgroundColor: themeOverrides?.bgRsvpTitle || undefined, fontSize: themeOverrides?.fontSizeRsvpTitle ? `${themeOverrides.fontSizeRsvpTitle}px` : undefined }}>
                        {themeOverrides?.textRsvpTitre || "Confirmer ma présence"}
                      </span>
                    </InlineTextEditor>
                </h2>
                <InlineTextEditor
                  isBuilder={isBuilder}
                  themeKey="RsvpSubtitle"
                  textKey="textRsvpSousTitre"
                  textLabel="Sous-titre / Message RSVP"
                  currentText={themeOverrides?.textRsvpSousTitre ?? "Ceci est un aperçu du formulaire RSVP. Les invités pourront confirmer leur présence ici."}
                  currentFontSize={themeOverrides?.fontSizeRsvpSubtitle ?? null}
                  currentColor={themeOverrides?.rsvpSubtitleColor || palette.sub}
                  currentFont={themeOverrides?.fontRsvpSubtitle ?? null}
                  currentBgColor={themeOverrides?.bgRsvpSubtitle ?? null}
                  currentHidden={themeOverrides?.hideRsvpSubtitle ?? false}
                  onUpdate={onThemeUpdate!}
                >
                  <p className={`${getFontClass(themeOverrides?.fontRsvpSubtitle, '')} mb-8`} style={{ color: themeOverrides?.rsvpSubtitleColor || palette.sub, backgroundColor: themeOverrides?.bgRsvpSubtitle || undefined, fontSize: themeOverrides?.fontSizeRsvpSubtitle ? `${themeOverrides.fontSizeRsvpSubtitle}px` : undefined }}>
                    {themeOverrides?.textRsvpSousTitre || "Ceci est un aperçu du formulaire RSVP. Les invités pourront confirmer leur présence ici."}
                  </p>
                </InlineTextEditor>
              
              <div className="space-y-4 opacity-70 pointer-events-none">
                <input type="text" placeholder="Prénom et Nom" className="w-full px-4 py-3 rounded-xl border" style={{ background: palette.bg, borderColor: palette.rule }} readOnly />
                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 rounded-xl border-2 font-medium" style={{ borderColor: palette.accent, background: palette.accent + '11', color: palette.accent }}>Oui, avec joie !</button>
                  <button className="py-3 rounded-xl border-2 border-transparent font-medium" style={{ background: palette.bg }}>Je ne pourrai pas</button>
                </div>
                    <InlineTextEditor
                      isBuilder={isBuilder}
                      themeKey="RsvpButton"
                      currentFontSize={themeOverrides?.fontSizeRsvpButton ?? null}
                      currentColor={themeOverrides?.rsvpButtonColor || (dark ? palette.bg : '#fff')}
                      currentFont={themeOverrides?.fontRsvpButton ?? null}
                      currentBgColor={themeOverrides?.bgRsvpButton || palette.accent}
                      currentPadding={themeOverrides?.paddingRsvpButton ?? null}
                      currentHidden={themeOverrides?.hideRsvpButton ?? false}
                      onUpdate={onThemeUpdate!}
                    >
                      <button className={`${getFontClass(themeOverrides?.fontRsvpButton, '')} mx-auto rounded-xl font-bold flex items-center justify-center gap-2 mt-4`} style={{ background: themeOverrides?.bgRsvpButton || palette.accent, color: themeOverrides?.rsvpButtonColor || (dark ? palette.bg : '#fff'), fontSize: themeOverrides?.fontSizeRsvpButton ? `${themeOverrides.fontSizeRsvpButton}px` : undefined, height: themeOverrides?.paddingRsvpButton != null ? `${40 + themeOverrides.paddingRsvpButton}px` : "56px", width: themeOverrides?.paddingRsvpButton != null ? `${150 + themeOverrides.paddingRsvpButton * 3}px` : "100%", padding: 0 }}>
                        <Send className="w-5 h-5" /> Envoyer
                      </button>
                    </InlineTextEditor>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
