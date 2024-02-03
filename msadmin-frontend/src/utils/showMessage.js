import React from 'react';
import { createRoot } from 'react-dom/client';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// 定义全局变量以缓存root实例
let snackbarRoot = null;

export function showMessage(message, severity = 'info') {
    const snackbarContainerId = 'snackbar-container';
    let container = document.getElementById(snackbarContainerId);

    // 如果容器不存在，则创建它
    if (!container) {
        container = document.createElement('div');
        container.id = snackbarContainerId;
        document.body.appendChild(container);
    }

    // 如果root不存在，创建并缓存它
    if (!snackbarRoot) {
        snackbarRoot = createRoot(container);
    }

    // 使用缓存的root渲染Snackbar
    snackbarRoot.render(
        <Snackbar open
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                  autoHideDuration={6000}
                  onClose={() => snackbarRoot.render(<></>)}>
            <Alert severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
}
