function PhoneFrame({ children }) {
  return (
    <div className="w-[320px] h-[700px] bg-black rounded-3xl shadow-xl relative overflow-hidden">
      <div className="bg-gradient-to-br from-black via-[#0f2b0f] to-[#163b15] h-full w-full rounded-xl overflow-auto scrollbar-hide">
        {children}
      </div>
    </div>
  );
}

export default PhoneFrame;
