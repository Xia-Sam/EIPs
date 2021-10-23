(window.webpackJsonp=window.webpackJsonp||[]).push([[361],{766:function(e,t,o){"use strict";o.r(t);var a=o(46),i=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h2",{attrs:{id:"simple-summary"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#simple-summary"}},[e._v("#")]),e._v(" Simple Summary")]),e._v(" "),o("p",[e._v("Specification of the consensus mechanism upgrade on Ethereum Mainnet that introduces Proof-of-Stake.")]),e._v(" "),o("h2",{attrs:{id:"abstract"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#abstract"}},[e._v("#")]),e._v(" Abstract")]),e._v(" "),o("p",[e._v("This EIP deprecates Proof-of-Work (PoW) and supersedes it with the new Proof-of-Stake consensus mechanism (PoS) driven by the beacon chain. Information on the bootstrapping of the new consensus mechanism is documented in "),o("RouterLink",{attrs:{to:"/eip-2982.html"}},[e._v("EIP-2982")]),e._v(". Full specification of the beacon chain can be found in the "),o("a",{attrs:{href:"https://github.com/ethereum/eth2.0-specs/",target:"_blank",rel:"noopener noreferrer"}},[e._v("eth2.0-specs"),o("OutboundLink")],1),e._v(" repository.")],1),e._v(" "),o("p",[e._v("This document specifies the set of changes to the block structure, block processing, fork choice rule and network interface introduced by the consensus upgrade.")]),e._v(" "),o("h2",{attrs:{id:"motivation"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#motivation"}},[e._v("#")]),e._v(" Motivation")]),e._v(" "),o("p",[e._v("The beacon chain network has been up and running since December 2020. Neither safety nor liveness failures were detected during this period of time. This long period of running without failure demonstrates the sustainability of the beacon chain system and its readiness to become a security provider for the Ethereum Mainnet.")]),e._v(" "),o("p",[e._v("To understand the motivation of introducing the Proof-of-Stake consensus see the Motivation section of "),o("RouterLink",{attrs:{to:"/eip-2982.html#motivation"}},[e._v("EIP-2982")]),e._v(".")],1),e._v(" "),o("h2",{attrs:{id:"specification"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#specification"}},[e._v("#")]),e._v(" Specification")]),e._v(" "),o("h3",{attrs:{id:"definitions"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#definitions"}},[e._v("#")]),e._v(" Definitions")]),e._v(" "),o("ul",[o("li",[o("strong",[e._v("PoW block")]),e._v(": Block that is built and verified by the existing proof-of-work mechanism. In other words, a block of the Ethereum network before the consensus upgrade.")]),e._v(" "),o("li",[o("strong",[e._v("PoS block")]),e._v(": Block that is built and verified by the new proof-of-stake mechanism.")]),e._v(" "),o("li",[o("strong",[e._v("Terminal PoW block")]),e._v(": A PoW block that satisfies the following conditions --\n"),o("code",[e._v("pow_block.total_difficulty >= TERMINAL_TOTAL_DIFFICULTY")]),e._v(" "),o("em",[e._v("and")]),e._v(" "),o("code",[e._v("pow_block.parent_block.total_difficulty < TERMINAL_TOTAL_DIFFICULTY")]),e._v(".\nThere can be more than one terminal PoW block in the network, e.g. multiple children of the same pre-terminal block.")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("TERMINAL_TOTAL_DIFFICULTY")])]),e._v(" The amount of total difficulty reached by the network that triggers the consensus upgrade.")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("TRANSITION_BLOCK")])]),e._v(" The earliest PoS block of the canonical chain, i.e. the PoS block with the lowest block height.\n"),o("code",[e._v("TRANSITION_BLOCK")]),e._v(" "),o("strong",[e._v("MUST")]),e._v(" be a child of a terminal PoW block.")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("POS_FORKCHOICE_UPDATED")])]),e._v(" An event occurring when the state of the proof-of-stake fork choice is updated.")])]),e._v(" "),o("h4",{attrs:{id:"pos-events"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pos-events"}},[e._v("#")]),e._v(" PoS events")]),e._v(" "),o("p",[e._v("Events having the "),o("code",[e._v("POS_")]),e._v(" prefix in the name (PoS events) are emitted by the new proof-of-stake consensus mechanism. They signify the corresponding assertion that has been made regarding a block specified by the event. The underlying logic of PoS events can be found in the beacon chain specification. On the occurrence of each PoS event the corresponding action that is specified by this EIP "),o("strong",[e._v("MUST")]),e._v(" be taken.")]),e._v(" "),o("p",[e._v("The details provided below must be taken into account when reading those parts of the specification that refer to the PoS events:")]),e._v(" "),o("ul",[o("li",[e._v("Reference to a block that is contained by PoS events is provided in a form of a block hash unless another is explicitly specified.")]),e._v(" "),o("li",[e._v("A "),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" event contains references to the head of the canonical chain and to the most recent finalized block. Before the first finalized block occurs in the system the finalized block hash provided by this event is stubbed with "),o("code",[e._v("0x0000000000000000000000000000000000000000000000000000000000000000")]),e._v(".")]),e._v(" "),o("li",[o("strong",[o("code",[e._v("FIRST_FINALIZED_BLOCK")])]),e._v(" The first finalized block that is designated by "),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" event and has the hash that differs from the stub.")])]),e._v(" "),o("h3",{attrs:{id:"terminal-total-difficulty"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#terminal-total-difficulty"}},[e._v("#")]),e._v(" Terminal total difficulty")]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("TERMINAL_TOTAL_DIFFICULTY")]),e._v(" parameter is a part of client software configuration and "),o("strong",[e._v("MUST")]),e._v(" be included into its binary distribution.")]),e._v(" "),o("h3",{attrs:{id:"pow-block-processing"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pow-block-processing"}},[e._v("#")]),e._v(" PoW block processing")]),e._v(" "),o("p",[e._v("PoW blocks that are descendants of any terminal PoW block "),o("strong",[e._v("MUST NOT")]),e._v(" be imported. This implies that a terminal PoW block will be the last PoW block in the canonical chain.")]),e._v(" "),o("h3",{attrs:{id:"constants"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#constants"}},[e._v("#")]),e._v(" Constants")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("Name")]),e._v(" "),o("th",[e._v("Value")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[o("strong",[o("code",[e._v("MAX_EXTRA_DATA_BYTES")])])]),e._v(" "),o("td",[o("code",[e._v("32")])])])])]),e._v(" "),o("h3",{attrs:{id:"block-structure"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#block-structure"}},[e._v("#")]),e._v(" Block structure")]),e._v(" "),o("p",[e._v("Beginning with "),o("code",[e._v("TRANSITION_BLOCK")]),e._v(", a number of previously dynamic block fields are deprecated by enforcing these values to instead be constants. Each block field listed in the table below "),o("strong",[e._v("MUST")]),e._v(" be replaced with the corresponding constant value.")]),e._v(" "),o("table",[o("thead",[o("tr",[o("th",[e._v("Field")]),e._v(" "),o("th",[e._v("Constant value")]),e._v(" "),o("th",[e._v("Comment")])])]),e._v(" "),o("tbody",[o("tr",[o("td",[o("strong",[o("code",[e._v("ommersHash")])])]),e._v(" "),o("td",[o("code",[e._v("0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347")])]),e._v(" "),o("td",[o("code",[e._v("= Keccak256(RLP([]))")])])]),e._v(" "),o("tr",[o("td",[o("strong",[o("code",[e._v("difficulty")])])]),e._v(" "),o("td",[o("code",[e._v("0")])]),e._v(" "),o("td")]),e._v(" "),o("tr",[o("td",[o("strong",[o("code",[e._v("mixHash")])])]),e._v(" "),o("td",[o("code",[e._v("0x0000000000000000000000000000000000000000000000000000000000000000")])]),e._v(" "),o("td")]),e._v(" "),o("tr",[o("td",[o("strong",[o("code",[e._v("nonce")])])]),e._v(" "),o("td",[o("code",[e._v("0x0000000000000000")])]),e._v(" "),o("td")]),e._v(" "),o("tr",[o("td",[o("strong",[o("code",[e._v("ommers")])])]),e._v(" "),o("td",[o("code",[e._v("[]")])]),e._v(" "),o("td",[o("code",[e._v("RLP([]) = 0xc0")])])])])]),e._v(" "),o("p",[e._v("Beginning with "),o("code",[e._v("TRANSITION_BLOCK")]),e._v(", the validation of the block's "),o("strong",[o("code",[e._v("extraData")])]),e._v(" field changes: The length of the block's "),o("strong",[o("code",[e._v("extraData")])]),e._v(" "),o("strong",[e._v("MUST")]),e._v(" be less than or equal to "),o("strong",[o("code",[e._v("MAX_EXTRA_DATA_BYTES")])]),e._v(" bytes.")]),e._v(" "),o("p",[o("em",[e._v("Note")]),e._v(": Logic and validity conditions of block fields that are "),o("em",[e._v("not")]),e._v(" specified here "),o("strong",[e._v("MUST")]),e._v(" remain unchanged. Additionally, the overall block format "),o("strong",[e._v("MUST")]),e._v(" remain unchanged.")]),e._v(" "),o("h3",{attrs:{id:"block-validity"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#block-validity"}},[e._v("#")]),e._v(" Block validity")]),e._v(" "),o("p",[e._v("Beginning with "),o("code",[e._v("TRANSITION_BLOCK")]),e._v(", the block validity conditions "),o("strong",[e._v("MUST")]),e._v(" be altered by the following:")]),e._v(" "),o("ul",[o("li",[e._v("Remove verification of the block's "),o("strong",[o("code",[e._v("difficulty")])]),e._v(" value with respect to the difficulty formula.")]),e._v(" "),o("li",[e._v("Remove verification of the block's "),o("strong",[o("code",[e._v("nonce")])]),e._v(" and "),o("strong",[o("code",[e._v("mixHash")])]),e._v(" values with respect to the Ethash function.")]),e._v(" "),o("li",[e._v("Remove all validation rules that are evaluated over the list of ommers and each member of this list.")]),e._v(" "),o("li",[e._v("Add verification of the fields noted in the "),o("a",{attrs:{href:"#block-structure"}},[e._v("block structure")]),e._v(" section.")])]),e._v(" "),o("p",[o("em",[e._v("Note")]),e._v(": If one of the new rules fails then the block "),o("strong",[e._v("MUST")]),e._v(" be invalidated.")]),e._v(" "),o("p",[o("em",[e._v("Note")]),e._v(": Validity rules that are not specified in the list above "),o("strong",[e._v("MUST")]),e._v(" remain unchanged.")]),e._v(" "),o("h3",{attrs:{id:"block-and-ommer-rewards"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#block-and-ommer-rewards"}},[e._v("#")]),e._v(" Block and ommer rewards")]),e._v(" "),o("p",[e._v("Beginning with "),o("code",[e._v("TRANSITION_BLOCK")]),e._v(", block and ommer rewards are deprecated. Specifically, the following actions "),o("strong",[e._v("MUST")]),e._v(" be taken:")]),e._v(" "),o("ul",[o("li",[e._v("Remove increasing the balance of the block's "),o("strong",[o("code",[e._v("beneficiary")])]),e._v(" account by the block reward.")]),e._v(" "),o("li",[e._v("Remove increasing the balance of the block's "),o("strong",[o("code",[e._v("beneficiary")])]),e._v(" account by the ommer inclusion reward per each ommer.")]),e._v(" "),o("li",[e._v("Remove increasing the balance of the ommer's "),o("strong",[o("code",[e._v("beneficiary")])]),e._v(" account by the ommer block reward per each ommer.")])]),e._v(" "),o("p",[o("em",[e._v("Note")]),e._v(": Transaction fee mechanics affecting the block's "),o("code",[e._v("beneficiary")]),e._v(" account "),o("strong",[e._v("MUST")]),e._v(" remain unchanged.")]),e._v(" "),o("h3",{attrs:{id:"fork-choice-rule"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#fork-choice-rule"}},[e._v("#")]),e._v(" Fork choice rule")]),e._v(" "),o("p",[e._v("As of the first "),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" event, the fork choice rule "),o("strong",[e._v("MUST")]),e._v(" be altered in the following way:")]),e._v(" "),o("ul",[o("li",[e._v("Remove the existing PoW heaviest chain rule.")]),e._v(" "),o("li",[e._v("Adhere to the new PoS LMD-GHOST rule.")])]),e._v(" "),o("p",[e._v("The new PoS LMD-GHOST fork choice rule is specified as follows. On each occurrence of a "),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" event including the first one, the following actions "),o("strong",[e._v("MUST")]),e._v(" be taken:")]),e._v(" "),o("ul",[o("li",[e._v("Consider the chain starting at genesis and ending with the head block nominated by the event as the canonical blockchain.")]),e._v(" "),o("li",[e._v("Set the head of the canonical blockchain to the corresponding block nominated by the event.")]),e._v(" "),o("li",[e._v("Beginning with the "),o("code",[e._v("FIRST_FINALIZED_BLOCK")]),e._v(", set the most recent finalized block to the corresponding block nominated by the event.")])]),e._v(" "),o("p",[e._v("Changes to the block tree store that are related to the above actions "),o("strong",[e._v("MUST")]),e._v(" be applied atomically.")]),e._v(" "),o("p",[o("em",[e._v("Note")]),e._v(": This rule "),o("strong",[e._v("MUST")]),e._v(' be strictly enforced. "Optimistic" updates to the head '),o("strong",[e._v("MUST NOT")]),e._v(" be made. That is -- if a new block is processed on top of the current head block, this new block becomes the new head if and only if an accompanying "),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" event occurs.")]),e._v(" "),o("h3",{attrs:{id:"network"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#network"}},[e._v("#")]),e._v(" Network")]),e._v(" "),o("p",[e._v("The networking stack "),o("strong",[e._v("SHOULD NOT")]),e._v(" send the following messages if they advertise the descendant of any terminal PoW block:")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblockhashes-0x01",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlockHashes (0x01)")]),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblock-0x07",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlock (0x07)")]),o("OutboundLink")],1)])]),e._v(" "),o("p",[e._v("Beginning with receiving the "),o("code",[e._v("FIRST_FINALIZED_BLOCK")]),e._v(", the networking stack "),o("strong",[e._v("MUST")]),e._v(" discard the following ingress messages:")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblockhashes-0x01",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlockHashes (0x01)")]),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblock-0x07",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlock (0x07)")]),o("OutboundLink")],1)])]),e._v(" "),o("p",[e._v("Beginning with receiving the finalized block next to the "),o("code",[e._v("FIRST_FINALIZED_BLOCK")]),e._v(", the networking stack "),o("strong",[e._v("MUST")]),e._v(" remove the handlers corresponding to the following messages:")]),e._v(" "),o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblockhashes-0x01",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlockHashes (0x01)")]),o("OutboundLink")],1)]),e._v(" "),o("li",[o("a",{attrs:{href:"https://github.com/ethereum/devp2p/blob/master/caps/eth.md#newblock-0x07",target:"_blank",rel:"noopener noreferrer"}},[o("code",[e._v("NewBlock (0x07)")]),o("OutboundLink")],1)])]),e._v(" "),o("p",[e._v("Peers that keep sending these messages after the handlers have been removed "),o("strong",[e._v("SHOULD")]),e._v(" be disconnected.")]),e._v(" "),o("p",[o("em",[e._v("Note:")]),e._v(" The logic of message handlers that are not affected by this section "),o("strong",[e._v("MUST")]),e._v(" remain unchanged.")]),e._v(" "),o("h2",{attrs:{id:"rationale"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#rationale"}},[e._v("#")]),e._v(" Rationale")]),e._v(" "),o("p",[e._v("The changes specified in this EIP target a minimal requisite set of consensus and client software modifications to safely replace the existing proof-of-work consensus algorithm with the new proof-of-stake consensus represented by the already in-production beacon chain.")]),e._v(" "),o("p",[e._v("This EIP was designed to minimize the complexity of hot-swapping the live consensus of the Ethereum network. Both the safety of the operation and time to production were taken into consideration. Additionally, a minimal changeset helps ensure that "),o("em",[e._v("most")]),e._v(" smart contracts and services will continue to function as intended during and after the transition with little to no required intervention.")]),e._v(" "),o("h3",{attrs:{id:"total-difficulty-triggering-the-upgrade"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#total-difficulty-triggering-the-upgrade"}},[e._v("#")]),e._v(" Total difficulty triggering the upgrade")]),e._v(" "),o("p",[e._v("See "),o("a",{attrs:{href:"#terminal-total-difficulty-vs-block-number"}},[e._v("Security considerations")]),e._v(".")]),e._v(" "),o("h3",{attrs:{id:"halting-the-import-of-pow-blocks"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#halting-the-import-of-pow-blocks"}},[e._v("#")]),e._v(" Halting the import of PoW blocks")]),e._v(" "),o("p",[e._v("See "),o("a",{attrs:{href:"#halt-the-importing-of-pow-blocks"}},[e._v("Security considerations")]),e._v(".")]),e._v(" "),o("h3",{attrs:{id:"replacing-block-fields-with-constants"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#replacing-block-fields-with-constants"}},[e._v("#")]),e._v(" Replacing block fields with constants")]),e._v(" "),o("p",[e._v("Deprecated block fields are replaced with constant values to ensure the block format remains backwards compatible. Preserving the block format aids existing smart contracts and services in providing uninterrupted service during and after this transition.")]),e._v(" "),o("p",[e._v("Particularly, this is important for those smart contracts that verify Merkle proofs of transaction/receipt inclusion and state by validating the hash of externally provided block header against the corresponding value returned by the "),o("code",[e._v("BLOCKHASH")]),e._v(" operation.")]),e._v(" "),o("p",[e._v("This change introduces an additional validity rule that enforces the replacement of deprecated block fields.")]),e._v(" "),o("h3",{attrs:{id:"replacing-difficulty-with-0"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#replacing-difficulty-with-0"}},[e._v("#")]),e._v(" Replacing "),o("code",[e._v("difficulty")]),e._v(" with "),o("code",[e._v("0")])]),e._v(" "),o("p",[e._v("After deprecating the proof-of-work the notion of difficulty no longer exists and replacing the block header "),o("strong",[o("code",[e._v("difficulty")])]),e._v(" field with "),o("code",[e._v("0")]),e._v(" constant is semantically sound.")]),e._v(" "),o("h3",{attrs:{id:"changing-block-validity-rules"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#changing-block-validity-rules"}},[e._v("#")]),e._v(" Changing block validity rules")]),e._v(" "),o("p",[e._v("The rule set enforcing the PoW seal validity is replaced with the corresponding PoS rules along with the consensus upgrade as the rationale behind this change.")]),e._v(" "),o("p",[e._v("An additional rule validating a set of deprecated block fields is required by the block format changes introduced by this specification.")]),e._v(" "),o("h3",{attrs:{id:"removing-block-rewards"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#removing-block-rewards"}},[e._v("#")]),e._v(" Removing block rewards")]),e._v(" "),o("p",[e._v("Existing rewards for producing and sealing blocks are deprecated along with the PoW mechanism. The new PoS consensus becomes both responsible for sealing blocks and for issuing block rewards once this specification enters into effect.")]),e._v(" "),o("h3",{attrs:{id:"supplanting-fork-choice-rule"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#supplanting-fork-choice-rule"}},[e._v("#")]),e._v(" Supplanting fork choice rule")]),e._v(" "),o("p",[e._v("The fork choice rule of the PoW mechanism becomes completely irrelevant after the upgrade and is replaced with the corresponding rule of the new PoS consensus mechanism.")]),e._v(" "),o("h3",{attrs:{id:"remove-of-pos-consensus-validated"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#remove-of-pos-consensus-validated"}},[e._v("#")]),e._v(" Remove of "),o("code",[e._v("POS_CONSENSUS_VALIDATED")])]),e._v(" "),o("p",[e._v("In prior draft versions of this EIP, an additional POS event -- "),o("code",[e._v("POS_CONSENSUS_VALIDATED")]),e._v(" -- was required as a validation condition for blocks. This event gave the signal to either fully incorporate or prune the block from the block tree.")]),e._v(" "),o("p",[e._v("This event was removed for two reasons:")]),e._v(" "),o("ol",[o("li",[e._v('This event was an unnecessary optimization to allow for pruning of "bad" blocks from the block tree. This optimization was unnecessary because the PoS consensus would never send '),o("code",[e._v("POS_FORKCHOICE_UPDATED")]),e._v(" for any such bad blocks or their descendants, and eventually any such blocks would be able to be pruned after a PoS finality event of an alternative branch in the block tree.")]),e._v(" "),o("li",[e._v("This event was dangerous in some scenarios because a block could be referenced by two "),o("em",[e._v("different")]),e._v(" and conflicting PoS branches. Thus for the same block in some scenarios, both a "),o("code",[e._v("POS_CONSENSUS_VALIDATED == TRUE")]),e._v(" and "),o("code",[e._v("POS_CONSENSUS_VALIDATED == FALSE")]),e._v(" event could sent, entirely negating the ability to safely perform the optimization in (1).")])]),e._v(" "),o("h3",{attrs:{id:"removing-block-gossip"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#removing-block-gossip"}},[e._v("#")]),e._v(" Removing block gossip")]),e._v(" "),o("p",[e._v("After the upgrade of the consensus mechanism only the beacon chain network will have enough information to validate a block. Thus, block gossip provided by the "),o("code",[e._v("eth")]),e._v(" network protocol will become unsafe and is deprecated in favour of the block gossip existing in the beacon chain network.")]),e._v(" "),o("p",[e._v("It is recommended for the client software to not propagate descendants of any terminal PoW block to reduce the load on processing the P2P component and stop operating in the environment with unknown security properties.")]),e._v(" "),o("h3",{attrs:{id:"restricting-the-length-of-extradata"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#restricting-the-length-of-extradata"}},[e._v("#")]),e._v(" Restricting the length of "),o("code",[e._v("extraData")])]),e._v(" "),o("p",[e._v("The "),o("code",[e._v("extraData")]),e._v(" field is defined as a maximum of "),o("code",[e._v("32")]),e._v(" bytes in the yellow paper. Thus mainnet and most PoW testnets cap the value at "),o("code",[e._v("32")]),e._v(" bytes.  "),o("code",[e._v("extraData")]),e._v(" fields of greater length are used by clique testnets and other networks to carry special signature/consensus schemes. This EIP restricts the length of "),o("code",[e._v("extraData")]),e._v(" to "),o("code",[e._v("32")]),e._v(" bytes because any network that is transitioning from another consensus mechanism to a beacon chain PoS consensus mechanism no longer needs extended or unbounded "),o("code",[e._v("extraData")]),e._v(".")]),e._v(" "),o("h2",{attrs:{id:"backwards-compatibility"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#backwards-compatibility"}},[e._v("#")]),e._v(" Backwards Compatibility")]),e._v(" "),o("p",[e._v("This EIP introduces backward incompatibilities in block validity, block rewards and fork choice rule.")]),e._v(" "),o("p",[e._v("The design of the consensus upgrade specified by this document does not introduce backward incompatibilities for existing applications and services built on top of Ethereum except for those that are described in the "),o("a",{attrs:{href:"#evm"}},[e._v("EVM")]),e._v(" section below or heavily depends on the PoW consensus in any other way.")]),e._v(" "),o("h3",{attrs:{id:"evm"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#evm"}},[e._v("#")]),e._v(" EVM")]),e._v(" "),o("p",[e._v("Although this EIP does not introduce any explicit changes to the EVM there are a couple of places where it may affect the logic of existing smart contracts.")]),e._v(" "),o("h4",{attrs:{id:"difficulty"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#difficulty"}},[e._v("#")]),e._v(" DIFFICULTY")]),e._v(" "),o("p",[o("code",[e._v("DIFFICULTY")]),e._v(" operation will always return "),o("code",[e._v("0")]),e._v(" after this EIP takes effect and deprecates the "),o("strong",[o("code",[e._v("difficulty")])]),e._v(" field by replacing it with "),o("code",[e._v("0")]),e._v(" constant.")]),e._v(" "),o("p",[o("em",[e._v("Note:")]),e._v(" Altering the "),o("code",[e._v("DIFFICULTY")]),e._v(" semantics to return randomness accumulated by the beacon chain is under consideration but will be introduced in a separate EIP.")]),e._v(" "),o("h4",{attrs:{id:"blockhash"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#blockhash"}},[e._v("#")]),e._v(" BLOCKHASH")]),e._v(" "),o("p",[e._v("Pseudo-random numbers obtained as the output of "),o("code",[e._v("BLOCKHASH")]),e._v(" operation become more insecure after this EIP takes effect and the PoW mechanism (which decreases the malleability of block hashes) gets supplanted by PoS.")]),e._v(" "),o("h2",{attrs:{id:"security-considerations"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#security-considerations"}},[e._v("#")]),e._v(" Security Considerations")]),e._v(" "),o("h3",{attrs:{id:"beacon-chain"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#beacon-chain"}},[e._v("#")]),e._v(" Beacon chain")]),e._v(" "),o("p",[e._v("See Security Considerations section of "),o("RouterLink",{attrs:{to:"/eip-2982.html#security-considerations"}},[e._v("EIP-2982")]),e._v(".")],1),e._v(" "),o("h3",{attrs:{id:"transition-process"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#transition-process"}},[e._v("#")]),e._v(" Transition process")]),e._v(" "),o("p",[e._v("The transition process used to take this specification into effect is a more sophisticated version of a hardfork -- the regular procedure of applying backwards incompatible changes in the Ethereum network. This process has multiple successive steps instead of the normal block-height point condition of simpler hardforks.")]),e._v(" "),o("p",[e._v("The complexity of this upgrade process stems from this fork targeting the underlying consensus mechanism rather than the application layer within the consensus mechanism. Although the design seeks simplicity where possible, safety and liveness considerations during this transition have been prioritized.")]),e._v(" "),o("h4",{attrs:{id:"terminal-total-difficulty-vs-block-number"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#terminal-total-difficulty-vs-block-number"}},[e._v("#")]),e._v(" Terminal total difficulty vs block number")]),e._v(" "),o("p",[e._v("Using a pre-defined block number for the hardfork is unsafe in this context due to the PoS fork choice taking priority during the transition.")]),e._v(" "),o("p",[e._v("An attacker may use a minority of hash power to build a malicious chain fork that would satisfy the block height requirement. Then the first PoS block may be maliciously proposed on top of the PoW block from this adversarial fork, becoming the head and subverting the security of the transition.")]),e._v(" "),o("p",[e._v("To protect the network from this attack scenario, difficulty accumulated by the chain (total difficulty) is used to trigger the upgrade.")]),e._v(" "),o("h4",{attrs:{id:"ability-to-jump-between-terminal-pow-blocks"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#ability-to-jump-between-terminal-pow-blocks"}},[e._v("#")]),e._v(" Ability to jump between terminal PoW blocks")]),e._v(" "),o("p",[e._v("There could be the case when a terminal PoW block is not observed by the majority of network participants due to (temporal) network partitioning. In such a case, this minority would switch their fork choice to the new rule provided by the PoS rooted on the minority terminal PoW block that they observed.")]),e._v(" "),o("p",[e._v("The transition process allows the network to re-org between forks with different terminal PoW blocks as long as (a) these blocks satisfy the terminal PoW block conditions and (b) the "),o("code",[e._v("FIRST_FINALIZED_BLOCK")]),e._v(" has not yet been received. This provides resilience against adverse network conditions during the transition process and prevents irreparable forks/partitions.")]),e._v(" "),o("h4",{attrs:{id:"halt-the-importing-of-pow-blocks"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#halt-the-importing-of-pow-blocks"}},[e._v("#")]),e._v(" Halt the importing of PoW blocks")]),e._v(" "),o("p",[e._v("Suppose the part of the client software that is connected to the beacon chain network goes offline before the Ethereum network reaches the "),o("code",[e._v("TERMINAL_TOTAL_DIFFICULTY")]),e._v(" and stays offline while the network meets this threshold. Such an event makes the client software unable to switch to PoS and allows it to keep following the PoW chain if this chain is being built beyond the terminal PoW block. Depending on how long the beacon chain part was offline, it could result in different adverse effects such as:")]),e._v(" "),o("ul",[o("li",[e._v("The client has no post-state for the terminal PoW block (the state has been pruned) which prevents it from doing the re-org to the PoS chain and leaving syncing from scratch as the only option to recover.")]),e._v(" "),o("li",[e._v("An application, a user or a service uses the data from the wrong fork (PoW chain that is kept being built) which can cause security issues on their side.")])]),e._v(" "),o("p",[e._v("Not importing PoW blocks that are beyond the terminal PoW block prevents these adverse effects on safety/re-orgs in the event of software or configuration failures "),o("em",[e._v("in favor")]),e._v(" of a liveness failure.")]),e._v(" "),o("h2",{attrs:{id:"copyright"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#copyright"}},[e._v("#")]),e._v(" Copyright")]),e._v(" "),o("p",[e._v("Copyright and related rights waived via "),o("a",{attrs:{href:"https://creativecommons.org/publicdomain/zero/1.0/",target:"_blank",rel:"noopener noreferrer"}},[e._v("CC0"),o("OutboundLink")],1),e._v(".")])])}),[],!1,null,null,null);t.default=i.exports}}]);