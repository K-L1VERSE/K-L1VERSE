
function Main() {

    return (
        <div>
            <button type="button" onClick={handleNotification} style={{ backgroundColor: notificationState.newNotifications.length > 0 ? 'red' : 'inherit'}}>
                알림
            </button>
        </div>
    );
}

export default Main;