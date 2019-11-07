//*** funcoes - metodos sistema ****
// jquery - é uma biblioteca de funcoes js que interage com html.
$(document).ready(function(){
   //funcao dp evento click do botao
    $('#btnEnviarClientes').click(function(){
        var msgHtml;
        //verificar se o campo esta vazio 
        // se txtNomeCliente é igual a vazio
        if($('input[id=txtNomeCliente]').val() == ''){
        //alert ('Preencha o campo vazio');
            msgHtml = 'Favor preencha o campo.';
            
            
            
        //posicionar o cursor no campo
            txtNomeCliente.focus();
            
        }else {
                                  
        //alert ('Preenchido!');                          
       // msgHtml = 'Campo preenchido';
            adicionarClientes();

        }  
        
        $('#dialog').dialog('open');
        $('#resultado').html(msgHtml);
        
    });
    
     $('#btncep').click(function(){
         BuscaCep();
     });

     $('#btnPesquisarClientes').click(function(){
         PesquisarClientes();
     });
    
});

$(function(){
       
        // Dialog
        $('#dialog').dialog({
          autoOpen: false,
          width: 600,
          buttons: {
            "Ok": function() {
              $(this).dialog("close");
            },
            "Cancel": function() {
              $(this).dialog("close");
            }
          }
        });
        // Dialog Link
        $('#dialog_link').click(function(){
          $('#dialog').dialog('open');
          return false;
        });     
 
        //hover states on the static widgets
        $('#link_idade, ul#icons li').hover(
          function() { $(this).addClass('ui-state-hover'); },
          function() { $(this).removeClass('ui-state-hover'); }
        );
 
      });

/**
	  * Função para criar um objeto XMLHTTPRequest
	  */
	 function CriaRequest() {
		 try{
			 request = new XMLHttpRequest();        
		 }catch (IEAtual){
			 
			 try{
				 request = new ActiveXObject("Msxml2.XMLHTTP");       
			 }catch(IEAntigo){
			 
				 try{
					 request = new ActiveXObject("Microsoft.XMLHTTP");          
				 }catch(falha){
					 request = false;
				 }
			 }
		 }
		 
		 if (!request) 
			 alert("Seu Navegador não suporta Ajax!");
		 else
			 return request;
	 }

function BuscaCep(){
	
	var strcep = $('input[id=txtCep]').val();
	var url    = "http://viacep.com.br/ws/" + strcep + "/json"; 
	
	var xmlreq = CriaRequest();
		// Iniciar uma requisição
		xmlreq.open('GET', url, true);
					
	   // Atribui uma função para ser executada sempre que houver uma mudança de ado
		 xmlreq.onreadystatechange = function(){
			 
			 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
			 if (xmlreq.readyState == 4) {
				 
				 // Verifica se o arquivo foi encontrado com sucesso
				 if (xmlreq.status == 200) {
						alert(xmlreq.responseText);
						preencheCampos(JSON.parse(xmlreq.responseText));
				 }
			 }
		 };
		 xmlreq.send(null);
}

//
function adicionarClientes(){
	
	var strnome = $('input[id=txtNomeCliente]').val();
	var strtelefone = $('input[id=txtTelefone]').val();
	var strendereco = $('input[id=txtEndereco]').val();
	var strcep = $('input[id=txtCep]').val();
  var strbairro = $('input[id=txtBairro]').val();
  
	var url    = "bd/controleclientes.php?txtNomeCliente=" + strnome + "&txtTelefone=" + strtelefone + "&txtEndereco=" + strendereco + "&txtCep=" + strcep + "&txtBairro=" + strbairro; 
	
	var xmlreq = CriaRequest();
		// Iniciar uma requisição
		xmlreq.open('GET', url, true);
					
	   // Atribui uma função para ser executada sempre que houver uma mudança de ado
		 xmlreq.onreadystatechange = function(){
			 
			 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
			 if (xmlreq.readyState == 4) {
				 
				 // Verifica se o arquivo foi encontrado com sucesso
				 if (xmlreq.status == 200) {
						//alert(xmlreq.responseText);
						//preencheCliente(JSON.parse(xmlreq.responseText));
				 }
			 }
		 };
		 xmlreq.send(null);
	
		
}

// bd/controleclientes.php?txtpesquisarcliente=
function PesquisarClientes(){
	
	var strnome = $('input[id=txtNomeCliente]').val();
	var url    = "bd/controleclientes.php?txtpesquisarcliente=" + strnome; 
	
	var xmlreq = CriaRequest();
		// Iniciar uma requisição
		xmlreq.open('GET', url, true);
					
	   // Atribui uma função para ser executada sempre que houver uma mudança de ado
		 xmlreq.onreadystatechange = function(){
			 
			 // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)
			 if (xmlreq.readyState == 4) {
				 
				 // Verifica se o arquivo foi encontrado com sucesso
				 if (xmlreq.status == 200) {
						//alert(xmlreq.responseText);
						preencheCliente(JSON.parse(xmlreq.responseText));
				 }
			 }
		 };
		 xmlreq.send(null);
	
		
}


function preencheCampos(obj) {
  $('input[id=txtEndereco]').val(obj.logradouro);
  $('input[id=complemento]').val(obj.complemento);
  $('input[id=txtBairro]').val(obj.bairro);
  $('input[id=uf]').val(obj.uf);
  $('input[id=ibge]').val(obj.ibge);
  
}

function preencheCliente(obj) {
    $('input[id=txtNomeCliente]').val(obj[0].Nome);
    $('input[id=txtTelefone]').val(obj[0].Telefone);
    $('input[id=txtEndereco]').val(obj[0].Endereco);
    $('input[id=txtCep]').val(obj[0].CEP);
    $('input[id=txtBairro]').val(obj[0].Bairro);
		
}