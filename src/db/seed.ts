import { Sequelize } from "sequelize"
import Usuarios from "../models/usuario.js"
import Maquinas from "../models/maquina.js"

const foto = "\x646174613a696d6167652f6a7065673b6261736536342c2f396a2f34414151536b5a4a5267414241514141415141424141442f3277434541416b4742784151454249534541385044784156447841504468415144673850465241504668455746685556465255594853676747426f6e48685556495445694a536b724c6934754678387a4f444d744e7967744c69734243676f4b4467304f4778415147793067494355744c5373744d5330744c5330724e6930724c5330724c5373744b7973744b7930724c5330724c5330744c5330744b7930744c5463744c5330334b7930744c5373744b2f2f4141424549414f454134514d4249674143455145444551482f78414163414145414151554241514141414141414141414141414141424145434177554742776a2f7841424545414143416741434267554a4241634842514141414141414151494442424546426849684d56456951574678675163544d6c4a796b6147787752516a516d497a55344b53777448774654524563374b7a34525a55593353692f3851414767454241414d4241514541414141414141414141414141414149444241554242762f4541434d5241514143416749434167494441414141414141414141414241674d52424345534d524e42496a4d464d6d482f3267414d41774541416845444551412f415063514141414141416f324255746e4e4a5a74704c6932336b6b6a6e4e4d613077726b36384f6c666174306d6e304950746c317673527a474c737578447a78466b724f566363347758374b342b4a6d79636d74656f376c6f783865317535366831754e317477746263595364382b564b326c2b39774e5266725a695a666f364b3631314f79626b2f636a5677773753335161585a466f73736c6c784d6c75566b6e2f47717647704876744978476e4d632f38414578682f6c31522f697a4e5a694e4c597a7278743358775556386b59735265613345586c6679586e334b7a34365236687350384171584851345975637579554b32766b6244522f6c48757261574972686248726c58304a4c7765356e4759693867747562795262584c65763271746a7050303933305a72506773546c3576455637547979726e4a516e6e7932587666676267384630666f7453335357666564566f7653324a7743543270346a447230365a76616e43504f75543565712b57347670796f6d64537076785a694e773952424730646a6137363457315455363578326f535857766f2b72496b6d754a5a4141486f41414141414141414141414141414141414141635a7250706964747277744461697431383438584a2f676a39546f74503439596644325739635935527a3964376f2f466e6c62316f56455848444a5474626274784d31756333783249386375312b3479386a4a7238647448487075647576775768495678547463594c31633076652b5a5733544f4271334b366c4e63564637543863737a69734e6f7248342f707a6d3968384a577961692f5a697550754e7058714a7533346e66325662763952682b53492f72446234372f744c6254316a776a345872786a4e664e474f654f7173394779452b36535a71376452354c30635246396b7133483470763547767847716d4b68776a437a74726e76384163386d56546c6d66616461312b70547366685530396e632f6763786972576d30397a584645353234696a644e5453355752667a5a4230712f4f355367737035714d6f392b354e436c2b3072563636514e38336b6a64614e306477334762524f6963387438666564424c424f6d4f303175345a72686d546d642b6b596a58746870715546326b664834724f4f61492b4f7876616153574f7a626a6e326b59684b5a6468354d4e4e62474973776a6633646d64314b395778656e46646a572f77414431452b633946342f37506a614c46776a6642742f6c62796c38477a364c69383935314f50615a7271584d3546596933536f414e436741414141414141414141414141414141414148462b565335787763457678584a5075554a5035356534382f314f30577352695971537a68464f63317a79344c336e6f6e6c5077726e676c4a6667746a4b587374536a383549356e7959565a79766c31714d492b446266304f6279596d636a66676e574c62754931354c4a4c4a4c676b566343516f4658416838627a7a5248417879695335514d55346c56364a31736832314a724a704e636d6b7a55596a5637437a6562717966354a536838457a657a52676b6a4e614e4c713263746a4e56344c70555473716d7544326e4a5a397658385268744a7a6e566252656b725952796b2f575758526b6a6f3755636c72624631374e30654c6a4f6d58626d73342f464d3978336d4a306e4d525a794f4d786a6c7749486e4d704c76336d5678794939687171727361526a757a37476a365430566274305654396171755876696d664e2b50394666313148304e71762f41484843662b70522f74524e33482b324c50384154614141314d77414141414141414141414141414141414141492b4f7773627135317a57635a78635a647a4f46314a305a5043346e4630326355716e462b74427565556b65684771786355735647587255536a6e374d34762b497a353678314b33466159334352474a56774c344d724e6e6b566a543366614e4f4a486d69564d6a5747624a433669504e4565614a4d79504d785a476972424e484e3634777a77306e796e422f3841316c3954705a6e4f36332f33577a76722f7742794a54487464447a757769326d776e684c63732f4e575a65784c2b527237655857624b53685a64704239442b75523947614172324d4a6834372b6a683659372b79435238355979446e73515847545556337435492b6d4d50445a68464c646c474b39794e2f476a32775a2f706b4142715a77414141414141414141414141414141414141445736573354706c2b6555483353692f716b624967365a686e5532754d5847612f5a615a586c6a644a54704f725170475a567a49736243726d59766b6150426b6e497754596c4d78536b5658756e577132624d4532587a6b59704d79586c6f724448597944694753725a4776784d796d563159514d5661306366725854486f545379626c737674336638485434795a7832732b4b7a6c43432f4374702b302b48772b5a4c427562705a4e52524a314e77483272535748686c6e474531625032612b6c38386a36425235763547394275464d38584e5a53746578546e2b7069393876475766677530394a4f2f6872717269356262734141755667414141414141414141414141414141414141466c73464a4e506730302b356c355154324f6377306d6f35506a4675443734764979625a54534d4e692b584b6155313753364d76345759647334655366433031644b6b6555524c4d356d4f556978794c4849706d36794b72704d78546b556c4d6a32326c637973694674307a57596d777a58326d72785678586156314b6f576b63536f786c4a38457332614c564c51466d6c4d586b3831556d724d5450716a44506448506d2b48677a6278304e6470437859656d63494e5a5732796d336b71314a52335a6358306b38757739593163304854676149303072637438357630724a766a4b54356e542f6a38473438355975626d31506a44593465694e634977676c47455971454972676f705a4a4979414858637741414141414141414141414141414141414141414143685541617654314f6465326c76673972396e3853397870664f485753696d736e346e4761517064466a672f52394b7038345a384f3963446c632f463335773363532b2f776c6c64685a4b3068797842676e69446d62626f716c3258454f36386a32346b7877716e5a77364d6575543466386e6e632b6b3472705a5a5935504b4b7a6236694e70665a716a474f6163393870642b5735456a45343675684f4e66546e317935484f3469317962636e6d787149546a6270764a65383862626e2f774274502f64725055736a7848566e5458324c4565656462736a734f4534786155746c35504e5a376d3830747836336f50542b47786b647169784e723071356447634f79556636523365462b714848356e375a62514147786c414141414141414141414141414141414141414141414131576b394d77716578466563743956506448326e3141624f6331465a74704c726265527a476e394a303278324978646a5433575a374b692b616657516358694c62586e624c506c46626f78376c312b4a466c456a6173576a5576596d596e6349367062546255396c635a5257316c336f6a796c523133533773736e37736a5a364a7832786956532b466c55704c326f7466544d334e314d58786a48334934334a3438557430366548504e6f3763724336706234567a6d2b62573733766751386469724a626d396c6572483676724f727846636373746c5a647870635a684950384f5864754d637a4c56576475577449307a6234725237586f7650736537346d542b775a56304f2b2f6f78665270725765646b337762355257393975575857537859375a4c654e5875544c576c6479352f59334673584f75536e4355713572305a77626931346d77564466425033466673556c786137743539466a70464b78574844766562326d30756e3162386f736f355634395a726773544263503879432f314c33645a364e68735243794b6e584b4d345357635a52616b6d7538384e7530573273347450734d6d684e4c347652383836656c44504f7969626578506e6c3672375638536144334d476b3161316c6f78304d363834574a6665557a3353672f346c326f335941414141414141414141414141414141414131326e4d613671756a2b6b6e4a565665334c7238456d2f414348706a536b6d335651386d7431747671666c6a7a6c386a553134645257533857393762357439624a57476f5559704c7862347439626661566d674955346d43614a646949396941352b2b625750717934786770652b542f414a48623266544d34697462576b583251677672395430326a44526c424b537a3347666b59506b6a723274785a5043584f3467312f77426d6e5a4c5a684679665a316437366a7350374b717a337076736265524b72716a465a52696f726b6b6b59612f7839706e38706170356b5248347730476974575977616e646c4f5846512f444876352f49305774575038376473786651727a68486c6e2b4a2f54774f71316a306a35696c35503779585172374f63764266484938385a30635747754f4e56686a766b746564325773775747646d47777451523974786534725a474d312f575a625959465934763567595a4f796d616e584f566334764f466b486b302f36366a306a553758474f4b797076326138536c75793352753759386e7a5277556d704c6d6d617645317544556f74724a35786b6d303479584270395148763555356e556257503762526c5931396f72796a627579326c31545337666d644d4141414141414141414141414141555a7a476d4c747646375034616139332b5a5a786637715338547032634e5464747a747339652b782b4365797667674e6b706c73356b64544b4f59465a736a7a5a664b52676c494455614a5731704331386e4665364b583050554d4f75697534387a31576a745975392f77446d6b7663386a303670626b4265577a6b6b6d32386b6b32322b704c6958484c36333654796a35694c33764a325a6572315238514e42707a53447846726c2b42644774666c352b4a7257584d745946724d46686e5a4873594565776a574569776a57415731575a504c71667a4c376f35706f697a5a4b6373316e7a5147505666533777654d727462796874656276584f7154796b2f446a344875366566446575706e7a706a6c6c4a2b38396e31423072396f774654627a6e424f6d6666446376686b42306f4c504f4972746f4334464d796f4141414141414141474448336246566b2f56726e4c3352624f4230647571676e78324533337665646672585a73344c45506e544b503733522b707946627953584a4a6534435674687a492b32484d444c4b526a6c497363797955774d656f3063374c4a63375a76346e70554f435050504a375830632b62622b4a36496749756b386247697155356453796976576c3149383478463070796c4b547a6c4a74796661626e576e53586e6264694c7a68427464382b742f51304c594647577371793043326249396a4d316a4930324268735a47735a6d735a4873594743786d657158525247735a6b773075692b38434a704c69753437507952342f4b65497062347146305633644758384a78756b75433732542f4a37692f4e365270366c4f4e745438594f532b4d45423763704656497756707667737a4d715a646e764176326935544c56532b614c31543267464d79525a5252534c674141414141445261377979774e76624b6950767846612b707957326474724e67705834573275487035526e426335317a6a5a46654c696c346e6e3946796c484e5a726d6e756166576d7559457261473059646f62514756794d4f496e6c43542f4c4c3542794d474d6c393350324a6649446665542b7637714a306573656b664d55765a66336b383477374f624e507150445a70693375536a6d337933476f3037704634693579586f4c6f312b7a7a3865494776624c5777325774674757795a5673777a6b42624f52476d7a4a4f52486e4944484e6b61786d536369505a49444659792f4353342b4268735a58435333767541615139487852483046663576463461664c45565a3932326b2f67325a3864364438506d6171697a4b7944345a575165663753412b6873506a584864785849326c4e716d73302f77446735667a704a77654c634a4a72726154584e41644743694b67414141414141414144697461395870776e4c4534614f306e76784e4334742f72494c317561367a745177504a36726c4e5a7865612b5435506b792f4d36375744564b46306e6268354b692f3857374f7537323439542f4d76696364696f575554324d5257365a3957652b452f596e77667a41767a492b4f6633632b34795a6d4f2b4f63577636346f446472476561777361347670546a6b2b794858377a555a6c5a7a6234386b6c33466746536a5a52794d557067566e4977546b4a7a4d4535414a794938354630356b6563674c5a794d4535463035456563674c624a4443793654376a464f52544379366667774a474d66516c33476c32756b76616a383062664653364d765a66794e5a6f2b695674316349724e79736a315a354a4e4e734432587a78757442344e7a61736b736f4c30632f78502b5247304c6f475573703370786a785666572f61354c734f706a464c63747957354a63674b6c51414141414141414141414141474846595775324c685a434e6b47736e4763564a50775a6d4148473652314a797a6c684c58426671626335772f5a6e365566484d357248346137442f33696d64612f574a626466373634654f52367555614138696a616d733030317a547a4b536d65673652315277567a63764e655a73653932554e3074766d30756a4a39365a7a324d3146766a767078454c463674304e6958647452336641446d70544d55706d78784f726d50687877726e323157516d7669307a5858344c4578394c4334706338714c4a66474b59474b557a424f5973323178727458665659766f525a3372742f646c2f49444a4f5a676e49707437586f71557536456e386b555748746c364e463875726f305779332b434178546b594a794e684451754d6e364f4478586a524f482b72496c55366c61546e2f684a51375a3256782b5459484f7a6b593637646c353854754d4c354c736450394a5a6836563755724838456a704e452b53724351616c69624c4d532b4f782b69686e32714f39727841387730546f6e46365273324d505735527a796e506571362b65314c6e3263543250553355624436506a747637374574644f365334646b492f6858785a3032467774645546437175466349724b4d495255497858596b5a67414141414141414141414141414141414141414141436a41414171414259793167414639432b494146785241414741414b6f414141414141414141414141422f396b3d"

export async function populate() {
	const data = await Usuarios.create({
		nome: "pascal",
		email: "pascal@email.com",
		telefone: "9988123456789",
		login: "1122",
		senha: "pascal",
		cpf: "12345678900",
		acesso: [1, 2, 3],
		foto: foto
	})

	await Maquinas.create({
		codigo: "01122001",
		nome: "torno mecânico 1",
		descricao: "torno mecânico da sala 1",
		id_responsavel: data.get("id")
	})
}
