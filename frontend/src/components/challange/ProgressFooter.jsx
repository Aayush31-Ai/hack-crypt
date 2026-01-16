const ProgressFooter = ({ current, total }) => {
  return (
    <div className="flex justify-center gap-2 pt-2">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${
            i <= current ? "bg-[#B19EEF]" : "bg-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressFooter;
