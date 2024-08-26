import { Helmet } from 'react-helmet-async'


const Title = ({ title = "chat", description = "this is the Chat app called chat app" }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
        </Helmet>
    );
};

export default Title;
