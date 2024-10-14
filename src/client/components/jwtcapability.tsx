import React, { useContext} from "react";
import { TransitiveCapability } from '@transitive-sdk/utils-web';
import { JWTContext, JWTContextProvider } from './jwtContext';


const _JWTCapability = ({extra_args}) => {
    const jwt = useContext(JWTContext);
    return <TransitiveCapability 
        jwt={jwt}
        {...extra_args}
    />
};

export function JWTCapability({device, capability, ...extra_args}) {
    return (
        <JWTContextProvider device={device} capability={capability}>
            <_JWTCapability extra_args={extra_args}/>
        </JWTContextProvider>
    );
}