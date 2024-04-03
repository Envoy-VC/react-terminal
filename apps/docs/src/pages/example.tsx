import { Command, Terminal } from '@envoy1084/react-terminal';

const App = () => {
  const commands: Command[] = [
    {
      name: 'time',
      description: 'Display the current time',
      handler: () => {
        return new Date().toLocaleTimeString();
      },
    },
    {
      name: 'fetch',
      description: 'Fetch from the url',
      args: ['url'],
      handler: async (args) => {
        const url = args.shift() ?? '';
        const res = await fetch(url);
        const json = await res.json();
        return JSON.stringify(json, null, 2);
      },
    },
  ];
  return <Terminal commands={commands} />;
};

export default App;
