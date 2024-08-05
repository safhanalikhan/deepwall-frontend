import Link from "next/link";
import styled from "styled-components";
import { usePathname } from 'next/navigation'


const PathHistory = styled.nav`
    padding:1rem 0;
    margin-bottom:1.5rem ;
    display:flex;
    align-items:center;
    gap:10px;
    i{
        font-size: 10px;
    }
`
const PageLink = styled(Link)`
  text-decoration:none;
  font-size:small;
  color:#000000a1;
`
export default function NavigationHistory() {
  const navPages = [
    {
      page: 'Home',
      path: '/'
    },
    {
      page: 'All products',
      path: '/products'
    },
    {
      page: 'Shopping Cart',
      path: '/cart'
    }
  ]
  const pathname = usePathname()

  return (
    <PathHistory>
      <PageLink href={'/'} > Home </PageLink>
      <i className="bi bi-chevron-right"></i>
      {
        navPages.map((i, index) => {
          if (i.path == pathname) {
            return <PageLink key={`${i.path}-${index}`} href={i.path} style={{ color: '#000' }} > {i.page} </PageLink>
          }
        })
      }

    </PathHistory>
  );
}