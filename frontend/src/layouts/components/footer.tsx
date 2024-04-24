
const Footer = () => {
  let date: Date | number = new Date();
  date = date.getFullYear();
  return (
    <div className="footerContainer">
      <p>© Copyright {date} SimplifyMe. All rights reserved.</p>
    </div>
  )
};

export default Footer;
