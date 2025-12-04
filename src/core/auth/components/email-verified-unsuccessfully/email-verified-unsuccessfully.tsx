import { Button } from "@/shared/components/ui/button";
import Container from "@/shared/components/ui/container";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmailVerifiedUnsuccessfully = () => {
  const [t] = useTranslation();
  const navigate = useNavigate();

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
          <span className="text-gradient-error">
            {t("your-email-address-has-been-unsuccessfully-verified")}
          </span>
        </motion.h2>

        <motion.p
          className="mb-2 text-sm font-semibold md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button variant="link" onClick={() => navigate("/")}>
            {t("navigate-to-the-home-page")}
          </Button>
        </motion.p>
      </motion.div>
    </Container>
  );
};

export default EmailVerifiedUnsuccessfully;
