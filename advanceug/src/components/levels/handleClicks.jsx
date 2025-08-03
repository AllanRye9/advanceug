import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HandleClick({ name }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`${name} card clicked!`);
    alert(`Navigating to ${name} resources...`);

    if (name === "uace") {
      navigate('/uace');
    } else if (name === "uce") {
      navigate('/uce');
    } else if (name === "ple") {
      navigate('/ple');
    } else {
      navigate('/other');
      alert("Not found!");
    }
  }, [name, navigate]);

  return null; // no UI, just redirect
}
