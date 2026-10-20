import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Users, Utensils, Send, Heart } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  primaryColor?: string;
}

export function PremiumRSVP({ title, subtitle, primaryColor = "#d4af37" }: Props) {
  const [step, setStep] = useState(0);
  const [presence, setPresence] = useState<"yes" | "no" | null>(null);
  const [guests, setGuests] = useState(1);
  const [diet, setDiet] = useState("");

  const handlePresence = (p: "yes" | "no") => {
    setPresence(p);
    setTimeout(() => {
      if (p === "no")
        setStep(3); // skip directly to end
      else setStep(1);
    }, 400);
  };

  const handleGuests = () => setStep(2);
  const handleSubmit = () => setStep(3);

  return (
    <div className="max-w-md mx-auto my-12 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-black/5 relative">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: primaryColor }} />

      <div className="p-8 text-center min-h-[320px] flex flex-col justify-center relative">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {title || "Confirmez votre présence"}
                </p>
                <h3 className="font-display text-2xl text-primary">
                  {subtitle || "Serez-vous des nôtres ?"}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handlePresence("yes")}
                  className={`w-full py-3 px-6 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                    presence === "yes"
                      ? "text-white shadow-md scale-[1.02]"
                      : "border-border hover:border-black/20 text-foreground hover:bg-black/5"
                  }`}
                  style={
                    presence === "yes"
                      ? { background: primaryColor, borderColor: primaryColor }
                      : {}
                  }
                >
                  <Check className="w-4 h-4" />
                  <span>Oui, avec joie !</span>
                </button>
                <button
                  onClick={() => handlePresence("no")}
                  className={`w-full py-3 px-6 rounded-xl border transition-all ${
                    presence === "no"
                      ? "bg-muted text-muted-foreground scale-[1.02]"
                      : "border-border hover:border-black/20 text-muted-foreground hover:bg-black/5"
                  }`}
                >
                  <span>Désolé, je ne pourrai pas</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <Users
                  className="w-8 h-8 mx-auto mb-4 opacity-50"
                  style={{ color: primaryColor }}
                />
                <h3 className="font-display text-2xl text-primary mb-2">Combien serez-vous ?</h3>
                <p className="text-sm text-muted-foreground">Incluez-vous dans le nombre.</p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl hover:bg-black/5"
                >
                  -
                </button>
                <span className="text-3xl font-display w-12 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-xl hover:bg-black/5"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleGuests}
                className="w-full py-3 px-6 rounded-xl text-white shadow-md font-medium transition hover:opacity-90"
                style={{ background: primaryColor }}
              >
                Suivant
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <Utensils
                  className="w-8 h-8 mx-auto mb-4 opacity-50"
                  style={{ color: primaryColor }}
                />
                <h3 className="font-display text-2xl text-primary mb-2">
                  Restrictions alimentaires
                </h3>
                <p className="text-sm text-muted-foreground">
                  Végétarien, allergies, etc. Laissez vide si aucune.
                </p>
              </div>

              <textarea
                value={diet}
                onChange={(e) => setDiet(e.target.value)}
                placeholder="Ex: Sans gluten..."
                className="w-full bg-white border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 resize-none"
                style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                rows={3}
              />

              <button
                onClick={handleSubmit}
                className="w-full py-3 px-6 rounded-xl text-white shadow-md font-medium transition hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: primaryColor }}
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma réponse</span>
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <Heart className="w-12 h-12 mx-auto mb-2" style={{ color: primaryColor }} />
              <h3 className="font-display text-2xl text-primary">Merci !</h3>
              <p className="text-muted-foreground">
                {presence === "yes"
                  ? "Votre réponse a bien été enregistrée. Nous avons hâte de vous y voir !"
                  : "Nous regrettons votre absence, merci de nous avoir prévenus."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
