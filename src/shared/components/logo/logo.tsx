const Logo: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={
        "text-gradient cursor-default text-xl font-bold tracking-tight sm:text-2xl"
      }
    >
      immobilis
    </div>
  );
};

export default Logo;
