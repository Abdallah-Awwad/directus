import { i18n } from '@/lang';
import { Ref } from 'vue';

type InlineCodeButton = {
	icon: string;
	tooltip: string;
	onAction: () => void;
	onSetup: (api: { setActive: (isActive: boolean) => void }) => () => void;
};

type UsableInlineCode = {
	inlineCodeButton: InlineCodeButton;
};

export default function useInlineCode(editor: Ref<any>): UsableInlineCode {

	const inlineCodeButton = {
		tooltip: i18n.global.t('wysiwyg_options.inline_code'),
		icon: 'inline-code',
		onAction: function () {
			editor.value.execCommand('mceToggleFormat', false, 'code');
		},
		onSetup: function (api: { setActive: (arg0: any) => void; }) {
			api.setActive(editor.value.formatter.match('code'));
			var unbind = editor.value.formatter.formatChanged('code', api.setActive).unbind;
			return function () {
				if (unbind) unbind();
			};
		}
	};
	return { inlineCodeButton };
}
