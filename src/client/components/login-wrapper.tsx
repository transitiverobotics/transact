import React, { useContext, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { getLogger} from '@transitive-sdk/utils-web';
import { UserContext } from './user-context';
import { Button } from './ui/button';

const log = getLogger('App');
log.setLevel('debug');

export const LoginWrapper = ({children}) => {
  const {session, login} = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {session ? children : (
        <Dialog open={!(session?.user)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Login
              </DialogTitle>
              <DialogDescription>
                Please enter your username and password.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Username
                </Label>
                <Input id="name" value={username} className="col-span-3" onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Password
                </Label>
                <Input id="username" value={password} className="col-span-3" type='password' onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => login(username, password)}>
                Login
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );  
}