type Props = {
  error: unknown;
};

export default function ErrorMessage(props: Props) {
  const { error } = props;

  return (
    <div>
      <h3 className="font-bold">An error occurred</h3>
      {typeof error === 'string' && <h4>{error}</h4>}
    </div>
  );
}
