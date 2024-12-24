import styles from "../styles/Spinner.module.css";

interface ISpinnerProps {
  size?: number;
}

const Spinner = ({ size }: ISpinnerProps) => {
  return <span className={styles.spinner} style={{ width: size, height: size }} />;
};

export default Spinner;
