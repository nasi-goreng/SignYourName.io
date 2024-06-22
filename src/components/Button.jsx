import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ text, link, className }) => (
  <Link
    to={link}
    className={`${className ? className : 'bg-[#8953CD] text-white'} w-[173px] h-[54px] p-[16px] rounded-[16px] transition-transform transform hover:scale-105 flex items-center justify-center`}
  >
    <span className="text-[20px] font-[700] leading-[22px]">{text}</span>
  </Link>
);

export default Button;
