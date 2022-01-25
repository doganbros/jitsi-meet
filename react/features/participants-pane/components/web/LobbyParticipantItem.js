// @flow

import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { hasRaisedHand } from '../../../base/participants';
import { showLobbyChatButton } from '../../../lobby/functions';
import { ACTION_TRIGGER, MEDIA_STATE } from '../../constants';
import { useLobbyActions } from '../../hooks';

import LobbyParticipantQuickAction from './LobbyParticipantQuickAction';
import ParticipantItem from './ParticipantItem';

type Props = {

    /**
     * If an overflow drawer should be displayed.
     */
    overflowDrawer: boolean,

    /**
     * Callback used to open a drawer with admit/reject actions.
     */
    openDrawerForParticipant: Function,

    /**
     * Participant reference.
     */
    participant: Object
};

const useStyles = makeStyles(theme => {
    return {
        button: {
            marginRight: `${theme.spacing(2)}px`
        }
    };
});

export const LobbyParticipantItem = ({
    overflowDrawer,
    participant: p,
    openDrawerForParticipant
}: Props) => {
    const { id } = p;
    const [ admit, reject, chat ] = useLobbyActions({ participantID: id });
    const { t } = useTranslation();
    const styles = useStyles();

    const showChat = useSelector(showLobbyChatButton(p));

    return (
        <ParticipantItem
            actionsTrigger = { ACTION_TRIGGER.PERMANENT }
            audioMediaState = { MEDIA_STATE.NONE }
            displayName = { p.name }
            local = { p.local }
            openDrawerForParticipant = { openDrawerForParticipant }
            overflowDrawer = { overflowDrawer }
            participantID = { id }
            raisedHand = { hasRaisedHand(p) }
            videoMediaState = { MEDIA_STATE.NONE }
            youText = { t('chat.you') }>
            <LobbyParticipantQuickAction
                accessibilityLabel = { `${t('lobby.reject')} ${p.name}` }
                className = { styles.button }
                onClick = { reject }
                secondary = { true }
                testId = { `reject-${id}` }>
                {t('lobby.reject') }
            </LobbyParticipantQuickAction>
            <LobbyParticipantQuickAction
                accessibilityLabel = { `${t('lobby.admit')} ${p.name}` }
                className = { showChat ? styles.button : undefined }
                onClick = { admit }
                testId = { `admit-${id}` }>
                {t('lobby.admit')}
            </LobbyParticipantQuickAction>
            {showChat ? <LobbyParticipantQuickAction
                accessibilityLabel = { `${t('lobby.chat')} ${p.name}` }
                onClick = { chat }
                testId = { `lobby-chat-${id}` }> { t('lobby.chat')} </LobbyParticipantQuickAction> : null}
        </ParticipantItem>
    );
};
