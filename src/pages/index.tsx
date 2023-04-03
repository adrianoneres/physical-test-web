import { styled } from '@/styles';

const Button = styled('button', {
  backgroundColor: '$danger',
  color: '$white',
  borderRadius: 4,
  border: 0,
  padding: '4px 8px',

  span: {
    fontWeight: 'bold',
  },

  '&:hover': {
    filter: 'brightness(1.1)',
  },
});

export default function Home() {
  return (
    <Button>
      <span>Test</span>Enviar
    </Button>
  );
}
