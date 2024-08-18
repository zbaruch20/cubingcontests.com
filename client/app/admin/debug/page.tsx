'use client';

import { useContext, useState } from 'react';
import { useMyFetch } from '~/helpers/customHooks';
import { MainContext } from '~/helpers/contexts';
import FormTextInput from '@c/form/FormTextInput';
import Button from '@c/UI/Button';
import ToastMessages from '@c/UI/ToastMessages';

const DebugPage = () => {
  const myFetch = useMyFetch();
  const { loadingId, resetMessagesAndLoadingId } = useContext(MainContext);

  const [debugInputValue, setDebugInputValue] = useState('');
  const [debugOutput, setDebugOutput] = useState('');
  const [email, setEmail] = useState('');

  const onDebugInputKeyDown = (e: any) => {
    resetMessagesAndLoadingId();
    setDebugOutput('');

    console.log('Event:', e);

    const output = `key: "${e.key}"
keyCode: "${e.keyCode}"
nativeEvent.key: "${e.nativeEvent?.keyCode}"
nativeEvent.code: "${e.nativeEvent?.keyCode}"
nativeEvent.code: "${e.nativeEvent?.code}"`;

    setDebugOutput(output);
  };

  const sendEmail = async () => {
    setDebugOutput('');

    const { errors } = await myFetch.post('/debug-sending-email', { email }, { loadingId: 'send_email_button' });

    if (!errors) setDebugOutput('Successfully sent email!');
  };

  return (
    <div>
      <div className="mx-auto px-3" style={{ maxWidth: '768px' }}>
        <h2 className="mb-5 text-center">Page for debugging</h2>
        <ToastMessages />

        <p className="mt-3 mb-4 fs-5" style={{ whiteSpace: 'pre-wrap' }}>
          {debugOutput}
        </p>

        <FormTextInput
          title="Debug input"
          value={debugInputValue}
          setValue={setDebugInputValue}
          onKeyDown={onDebugInputKeyDown}
        />

        <h4 className="my-4">Test sending emails</h4>

        <FormTextInput title="Email address" value={email} setValue={setEmail} />

        <Button id="send_email_button" text="Send" onClick={sendEmail} loadingId={loadingId} />
      </div>
    </div>
  );
};

export default DebugPage;
