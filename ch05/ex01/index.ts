const doNothingSpecial = () => {
  const a = "1st";
  {
    const a = -1;
    console.log((a >>> 0).toString(2));
  }
  console.log(a);
};

doNothingSpecial();
