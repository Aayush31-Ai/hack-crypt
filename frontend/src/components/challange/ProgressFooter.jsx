const ProgressFooter = ({ current, total }) => {
  return (
    <div className="flex justify-center gap-2 pt-2 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
            i <= current ? "bg-[#B19EEF]" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressFooter;
