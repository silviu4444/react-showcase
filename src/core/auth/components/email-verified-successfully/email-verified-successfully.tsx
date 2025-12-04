import Container from "@/shared/components/ui/container";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuthModal } from "../../hooks/use-auth-modal";

const EmailVerifiedSuccessfully = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);
  const [t] = useTranslation();
  const { onOpen } = useAuthModal();

  useEffect(() => {
    if (counter === 0) {
      navigate("/");
      onOpen();
    }
  }, [counter, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container className="flex h-full flex-col items-center justify-center">
      <motion.div
        className="py-10 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <motion.h2
          className="mb-4 text-2xl font-bold sm:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="text-gradient">
            {t("your-email-address-has-been-successfully-verified")}
          </span>
        </motion.h2>

        <motion.p
          className="mb-2 text-sm font-semibold md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t("you-will-be-redirected-to-the-main-page-in", {
            seconds: counter
          })}
        </motion.p>
      </motion.div>
    </Container>
  );
};

export default EmailVerifiedSuccessfully;
