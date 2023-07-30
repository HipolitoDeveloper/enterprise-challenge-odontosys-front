import Link from 'next/link';


const Error = ({statusCode}: any) => {
    return (
        <div className="error-container">
            {/*<img src="https://rickandmortyapi.com/api/character/avatar/234.jpeg" alt="a dead morty..."/>*/}
            {statusCode && <h1>Error: {statusCode}</h1>}
            <p>A página que você está tentando acessar não existe</p>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Link href="/dashboard">
                <a>Go back home</a>
            </Link>
        </div>
    )
}


Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
