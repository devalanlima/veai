"use client";

import { motion, AnimatePresence, AnimatePresenceProps } from "motion/react";
import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren<AnimatePresenceProps> {
  isLoading: boolean;
}

export default function SignUpFormLoading({
  isLoading = true,
  ...props
}: Props) {
  return (
    <AnimatePresence {...props}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-56 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-12 w-12 " />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-lg font-semibold ">Criando sua conta...</p>
              <p className="text-sm text-gray mt-1">Aguarde um momento</p>
            </motion.div>

            <motion.div
              className="flex gap-2 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
