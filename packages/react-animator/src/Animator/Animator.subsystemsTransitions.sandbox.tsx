import React, { type ReactElement, useState, type CSSProperties, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Animator } from '@arwes/react-animator';
import { Animated, aa, aaOpacity } from '@arwes/react-animated';

// LINK

interface LinkProps {
  path: string
  bg: string
  bgActive: string
  active: boolean
  onLink: (path: string) => void
}

const Link = (props: LinkProps): ReactElement => {
  const { path, bg, bgActive, active, onLink } = props;
  return (
    <div
      style={{
        backgroundColor: active ? bgActive : bg,
        cursor: 'pointer',
        transition: 'background-color 200ms ease-out'
      }}
      onClick={() => onLink(path)}
    />
  );
};

// HEADER

interface HeaderProps {
  path: string
  onLink: (path: string) => void
}

const Header = (props: HeaderProps): ReactElement => {
  const { path, onLink } = props;
  return (
    <Animator>
      <Animated
        as='header'
        style={{
          gridArea: 'header',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#055'
        }}
        animated={[aaOpacity(), aa('y', 20, 0)]}
        hideOnExited
      >
        <Link path='a' active={path === 'a'} bg='#550' bgActive='#aa0' onLink={onLink} />
        <Link path='b' active={path === 'b'} bg='#707' bgActive='#c0c' onLink={onLink} />
        <Link path='c' active={path === 'c'} bg='#050' bgActive='#0a0' onLink={onLink} />
        <Link path='' active={path === ''} bg='#555' bgActive='#aaa' onLink={onLink} />
      </Animated>
    </Animator>
  );
};

// FOOTER

const Footer = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='footer'
        style={{ gridArea: 'footer', backgroundColor: '#055' }}
        animated={[aaOpacity(), aa('y', -20, 0)]}
        hideOnExited
      />
    </Animator>
  );
};

// PANEL LEFT

const PanelLeft = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='aside'
        style={{ gridArea: 'panelLeft', backgroundColor: '#055' }}
        animated={[aaOpacity(), aa('x', 20, 0)]}
        hideOnExited
      />
    </Animator>
  );
};

// PANEL RIGHT

const PanelRight = (): ReactElement => {
  return (
    <Animator>
      <Animated
        as='aside'
        style={{ gridArea: 'panelRight', backgroundColor: '#055' }}
        animated={[aaOpacity(), aa('x', -20, 0)]}
        hideOnExited
      />
    </Animator>
  );
};

// ITEM

interface ItemProps {
  style?: CSSProperties
  bg: string
}

const Item = (props: ItemProps): ReactElement => {
  const { style, bg } = props;
  return (
    <Animator>
      <Animated
        style={{ ...style, backgroundColor: bg }}
        animated={aaOpacity()}
        hideOnExited
      />
    </Animator>
  );
};

// SUBSYSTEMS

const SubsystemA = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#550' />)}
      </div>
    </Animator>
  );
};

const SubsystemB = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#707' />)}
      </div>
    </Animator>
  );
};

const SubsystemC = (): ReactElement => {
  return (
    <Animator manager='stagger' combine>
      <div
        style={{
          display: 'grid',
          gap: '1rem',
          gridTemplateRows: 'repeat(5, 1fr)',
          width: '100%',
          height: '100%'
        }}
      >
        {Array(5).fill(0).map((_, i) => <Item key={i} bg='#050' />)}
      </div>
    </Animator>
  );
};

//

const Sandbox = (): ReactElement => {
  const [active, setActive] = useState(true);
  const [path, setPath] = useState('a');

  useEffect(() => {
    if (path === '') {
      setActive(false);
    }
  }, [path]);

  return (
    <Animator
      active={active}
      manager='stagger'
      combine
      duration={{ stagger: 0.1 }}
    >
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        padding: '1rem',
        color: '#fff'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateAreas: `
            "header header header"
            "panelLeft main panelRight"
            "footer footer footer"
          `,
          gridTemplateColumns: '20% 1fr 20%',
          gridTemplateRows: 'minmax(80px, 10%) 1fr minmax(80px, 10%)',
          gap: '1rem',
          width: '100%',
          height: '100%'
        }}>
          <Animator combine>
            <Header path={path} onLink={path => setPath(path)} />
            <Footer />
          </Animator>
          <Animator combine>
            <Animator
              combine
              manager='switch'
              checkToSend={[path]}
              checkToSendAction='refresh'
            >
              <Animator
                combine
                condition={() => path === 'a' || path === 'b'}
              >
                <PanelLeft />
              </Animator>
            </Animator>
            <Animator
              combine
              manager='switch'
              checkToSend={[path]}
              checkToSendAction='refresh'
            >
              <Animator
                combine
                condition={() => path === 'a'}
              >
                <PanelRight />
              </Animator>
            </Animator>
          </Animator>
          <main style={{ gridArea: 'main' }}>
            <Animator
              combine
              manager='switch'
              checkToSend={[path]}
              checkToSendAction='refresh'
            >
              <Animator
                combine
                unmountOnExited
                condition={() => path === 'a'}
              >
                <SubsystemA />
              </Animator>
              <Animator
                combine
                unmountOnExited
                condition={() => path === 'b'}
              >
                <SubsystemB />
              </Animator>
              <Animator
                combine
                unmountOnExited
                condition={() => path === 'c'}
              >
                <SubsystemC />
              </Animator>
            </Animator>
          </main>
        </div>
      </div>
    </Animator>
  );
};

createRoot(document.querySelector('#root') as HTMLElement).render(<Sandbox />);
