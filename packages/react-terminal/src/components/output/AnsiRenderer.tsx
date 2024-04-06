import { AnsiUp } from 'ansi_up';

interface Props {
  text: string;
}

const AnsiRenderer = ({ text }: Props) => {
  const ansi = new AnsiUp();
  ansi.use_classes = true;
  let html = ansi.ansi_to_html(text);

  return (
    <div
      className='whitespace-pre-wrap'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default AnsiRenderer;
