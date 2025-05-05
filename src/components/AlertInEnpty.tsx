import styled from 'styled-components/native';

interface IAlertProps {
    message: string;
    visible: boolean;
}

export default function AlertInEnpty( { message, visible }: IAlertProps) {
    return (
        <Container style={{ display: visible ? 'flex' : 'none' }}>
            <Pin source={require('./../../assets/images/pin.png')} />
            <Message>{message}</Message>

        </Container>
    );
}

const Container = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    position: relative;
    border-radius: 5px;
    border: 1px solid #6d6d6d;
    margin-top: 10px;
`;

const Message = styled.Text`
    font-size: 35px;
    color: #6d6d6d;   

    margin : 0 50px;
    
    text-align: center;
    font-family: 'Caveat-Regular';
`

const Pin  = styled.Image`
    width: 30px;
    height: 30px;
    position: absolute;
    top: -10px;
    left: 50%;
    z-index: 1;
    margin-left: 15px;
`;